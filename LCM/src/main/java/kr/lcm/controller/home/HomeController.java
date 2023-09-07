package kr.lcm.controller.home;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.lcm.model.user.AccountVO;
import kr.lcm.model.common.ClanVO;
import kr.lcm.service.common.UtilService;
import kr.lcm.service.home.HomeService;

@Controller
public class HomeController {
	
	@SuppressWarnings("unused")
	private static final Logger log = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	public HomeService iHomeService;
	
	@Autowired
	public UtilService iUtilService;
	
	//getClanList
	@RequestMapping(value = "/drawHomeAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String drawHomeAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		if(session.getAttribute("sEmail")!=null&&session.getAttribute("sEmail")!="") {
			AccountVO params = new AccountVO();
			params.setEmail(session.getAttribute("sEmail").toString());
			HashMap<String, Object> checkClan = iUtilService.checkClan(params);
			if(checkClan!=null&&!checkClan.isEmpty()) {
				if(Integer.parseInt(checkClan.get("AUTH").toString())!=0) {
					modelMap.put("result", "success");
				}
				else {
					modelMap.put("result", "wait");
				}
			}
			else {
				List<HashMap<String, Object>> clanList = iHomeService.getClanList();
				modelMap.put("clanList", clanList);
				modelMap.put("result", "noClan");
			}
		}
		else {
			List<HashMap<String, Object>> clanList = iHomeService.getClanList();
			modelMap.put("clanList", clanList);
			modelMap.put("result", "noSession");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	//joinClan
	@RequestMapping(value = "/joinClanAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String joinClanAjax(HttpSession session, AccountVO accountVo) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		accountVo.setEmail(session.getAttribute("sEmail").toString());
		HashMap<String, String> checkClanNick = iUtilService.checkClanNick(accountVo);
		if(checkClanNick==null||checkClanNick.isEmpty()) {
			iHomeService.joinClan(accountVo);
			iUtilService.insertLog("클랜 가입", session.getAttribute("sEmail").toString(), "가입 클랜 : "+ 
			                 	   accountVo.getClan().toString() + " | 가입 닉네임 : "+accountVo.getNick().toString()
					              );
			modelMap.put("result", "success");
		}
		else if(checkClanNick.get("FLG").toString().equals("WITHDRAW")){
			modelMap.put("result", "fail_withdraw");
		}
		else {
			modelMap.put("result", "fail_duplicate");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	//joinClan(Duplicate)
	@RequestMapping(value = "/joinDuplicateClanAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String joinDuplicateClanAjax(HttpSession session, AccountVO accountVo) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		accountVo.setEmail(session.getAttribute("sEmail").toString());
		iHomeService.joinDuplicateClan(accountVo);
		
		iUtilService.insertLog("클랜 재가입", accountVo.getEmail().toString(), "가입 클랜 : "+ accountVo.getClan().toString());
		
		return mapper.writeValueAsString(modelMap);
	}
	
	//chkMakeClan
	@RequestMapping(value = "/chkMakeClanAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String chkMakeClanAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		HashMap<String, Object> checkClanNm = iHomeService.checkClanNm(params);
		if(checkClanNm==null||checkClanNm.isEmpty()) {
			ClanVO clanVo = new ClanVO();
			clanVo.setNm(params.get("clan").toString());
			clanVo.setMaster(session.getAttribute("sEmail").toString());
			iHomeService.makeClan(clanVo);
			
			AccountVO accountVo = new AccountVO();
			accountVo.setEmail(session.getAttribute("sEmail").toString());
			accountVo.setNick(params.get("nick").toString());
			accountVo.setClan(params.get("clan").toString());
			accountVo.setAuth(3);
			iHomeService.joinClan(accountVo);
			
			iUtilService.insertLog("클랜 생성", session.getAttribute("sEmail").toString(), "생성 클랜 : "+ 
					accountVo.getClan().toString() + " | 가입 닉네임 : "+accountVo.getNick().toString()
					);
			modelMap.put("result", "success");
		}
		else if(checkClanNm.get("FLG").toString().equals("WITHDRAW")){
			modelMap.put("result", "fail_withdraw");
		}
		else{
			modelMap.put("result", "fail_duplicate");
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	//getHomeInfo
	@RequestMapping(value = "/getHomeInfoAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getHomeInfoAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String sEmail = session.getAttribute("sEmail").toString();
		HashMap<String, Object> getHomeInfo = iHomeService.getHomeInfo(sEmail);
		Object data = getHomeInfo.get("data");
		Object mList = getHomeInfo.get("mList");
		Object wList = getHomeInfo.get("wList");
		modelMap.put("data", data);
		modelMap.put("mList", mList);
		modelMap.put("wList", wList);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getHomeElo
	@RequestMapping(value = "/getHomeEloAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getHomeEloAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> getEloHistData = iHomeService.getHomeElo(params);
		Object getEloHistDataList = getEloHistData.get("list");
		Object getEloHistDataPb = getEloHistData.get("pb");
		modelMap.put("list", getEloHistDataList);
		modelMap.put("pb"  , getEloHistDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getHomeGame
	@RequestMapping(value = "/getHomeGameAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getHomeGameAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> getGameData = iHomeService.getHomeGame(params);
		Object getDataList = getGameData.get("list");
		Object getDataPb = getGameData.get("pb");
		modelMap.put("list", getDataList);
		modelMap.put("pb"  , getDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getHomeBoard
	@RequestMapping(value = "/getHomeBoardAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getHomeBoardAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String sEmail = session.getAttribute("sEmail").toString();
		List<HashMap<String, Object>> list = iHomeService.getHomeBoard(sEmail);
		modelMap.put("list", list);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getWaitingClan
	@RequestMapping(value = "/getWaitingClanAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getWaitingClanAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String sEmail = session.getAttribute("sEmail").toString();
		HashMap<String, Object> data = iHomeService.getWaitingClan(sEmail);
		modelMap.put("data", data);
		return mapper.writeValueAsString(modelMap);
	}
	
	//cancelAccount
	@RequestMapping(value = "/cancelAccountAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String cancelAccountAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String sEmail = session.getAttribute("sEmail").toString();
		iHomeService.cancelAccount(sEmail);
		iUtilService.insertLog("클랜 가입 철회", session.getAttribute("sEmail").toString(), "");
		return mapper.writeValueAsString(modelMap);
	}

}
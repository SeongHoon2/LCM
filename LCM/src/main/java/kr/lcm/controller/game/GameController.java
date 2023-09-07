package kr.lcm.controller.game;

import java.util.ArrayList;
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

import kr.lcm.controller.common.CommonController;
import kr.lcm.service.common.UtilService;
import kr.lcm.service.game.GameService;

@Controller
public class GameController {
	
	@SuppressWarnings("unused")
	private static final Logger log = LoggerFactory.getLogger(CommonController.class);
	
	@Autowired
	public GameService iGameService;
	
	@Autowired
	public UtilService iUtilService;
	
	//getGameMakeMenu
	@RequestMapping(value = "/getGameMakeMenuAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getGameMakeMenuAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		List<HashMap<String, Object>> list = iGameService.getGameMakeMenu(email);
		modelMap.put("list", list);
		return mapper.writeValueAsString(modelMap);
	}
	
	//makeGame
	@RequestMapping(value = "/makeGameAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String makeGameAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		iGameService.makeGame(params);
		iUtilService.insertLog("게임 생성", params.get("sEmail").toString(), "게임 명 : " + params.get("gm_NM").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//getGameInsList
	@RequestMapping(value = "/getGameInsListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getGameInsListAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		String gameInsPg = params.get("pg").toString();
		String ym = params.get("ym").toString();
		HashMap<String, Object> gameInsDocNo = new HashMap<String, Object>();
		if(params.get("no") == null||params.get("no") == "") {
			gameInsDocNo = iGameService.getGameInsDocNo(params);
			if(gameInsDocNo!=null) {
				modelMap.put("no", gameInsDocNo.get("NO").toString());
			}
			else {
				modelMap.put("no", "");
			}
		}
		else {
			modelMap.put("no", params.get("no").toString());
		}
		HashMap<String, Object> getGameInsData = iGameService.getGameInsList(email, gameInsPg, ym);
		Object getGameInsDataList = getGameInsData.get("list");
		Object getGameInsDataPb = getGameInsData.get("pb");
		modelMap.put("list", getGameInsDataList);
		modelMap.put("pb"  , getGameInsDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getGameInsDoc
	@RequestMapping(value = "/getGameInsDocAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getGameInsDocAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		HashMap<String, Object> data = new HashMap<String, Object>();
		List<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		if(params.get("no") == null||params.get("no") == "") {
			HashMap<String, Object> gameInsDocNo = iGameService.getGameInsDocNo(params);
			if(gameInsDocNo!=null) {
				params.put("no", gameInsDocNo.get("NO").toString());
				data = iGameService.getGameInsDoc(params);
				list = iGameService.getGameInsDocList(params);
			}
		}
		else {
			data = iGameService.getGameInsDoc(params);
			list = iGameService.getGameInsDocList(params);
		}
		modelMap.put("data", data);
		modelMap.put("list", list);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getInitUsr
	@RequestMapping(value = "/getInitUsrAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getInitUsrAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		HashMap<String, Object> data = iUtilService.getSessionNick(params);
		modelMap.put("data", data);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getUsrList
	@RequestMapping(value = "/getUsrListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getUsrListAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		String searchTxt = params.get("nickSearchTxt").toString();
		if(!searchTxt.equals("")) {
			searchTxt = "%"+searchTxt+"%";
		}
		params.put("nickSearchTxt", searchTxt);
		
		List<HashMap<String, Object>> list = iGameService.getGameInsUsrList(params);
		modelMap.put("list", list);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getChamp
	@RequestMapping(value = "/getChampAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getChampAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String searchTxt = params.get("nickChampTxt").toString();
		if(!searchTxt.equals("")) {
			searchTxt = "%"+searchTxt+"%";
		}
		params.put("nickChampTxt", searchTxt);
		List<HashMap<String, Object>> list = iGameService.getChampList(params);
		modelMap.put("list", list);
		return mapper.writeValueAsString(modelMap);
	}
	
	//insGameData
	@RequestMapping(value = "/insGameDataAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String insGameDataAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		iGameService.insGameData(params);
		iUtilService.insertLog("게임 데이터 입력", params.get("sEmail").toString(), 
				               "게임 번호 : " + params.get("no").toString() + " | " +
	            			   "피 대상자 : " + params.get("email").toString() 
				              );
		return mapper.writeValueAsString(modelMap);
	}
	
	//insGameData
	@RequestMapping(value = "/updateWinTeamAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updateWinTeamAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		iGameService.updateWinTeam(params);
		iUtilService.insertLog("게임 데이터 입력 (승패)", params.get("sEmail").toString(), "게임 번호 : " + params.get("no").toString());
		return mapper.writeValueAsString(modelMap);
	}

	
}
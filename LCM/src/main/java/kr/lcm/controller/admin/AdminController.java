package kr.lcm.controller.admin;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.lcm.controller.common.CommonController;
import kr.lcm.service.admin.AdminService;
import kr.lcm.service.common.UtilService;

@Controller
public class AdminController {
	
	@SuppressWarnings("unused")
	private static final Logger log = LoggerFactory.getLogger(CommonController.class);
	
	@Autowired
	public AdminService iAdminService;
	
	@Autowired
	public UtilService iUtilService;
	
	//getAdminBoard
	@RequestMapping(value = "/getAdminBoardAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String boardWriteAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		List<HashMap<String, Object>> adminBoardList = iAdminService.adminBoardList(email);
		modelMap.put("list", adminBoardList);
		return mapper.writeValueAsString(modelMap);
	}
	
	//addCtg
	@RequestMapping(value = "/addCtgAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String addCtgAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iAdminService.addCtg(params);
		iUtilService.insertLog("게시판 추가", email, "게시판 명 : " + params.get("addAdminBoardTxt").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//delCtg
	@RequestMapping(value = "/delCtgAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String delCtgAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iAdminService.delCtg(params);
		iUtilService.insertLog("게시판 삭제", email, "게시판 번호 : " + params.get("ctgDelNo").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//updCtg
	@RequestMapping(value = "/updCtgAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updCtgAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iAdminService.updCtg(params);
		iUtilService.insertLog("게시판 수정", email, "게시판 번호 : " + params.get("ctgDelNo").toString() + "수정 명 : " + params.get("ctgUpdNm").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//updCtgSort
	@RequestMapping(value = "/updCtgSortAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updCtgSortAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iAdminService.updCtgSort(params);
		iUtilService.insertLog("게시판 순서 수정", email, "");
		return mapper.writeValueAsString(modelMap);
	}
	
	//getAdminUsr
	@RequestMapping(value = "/getAdminUsrAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getAdminUsrAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		String usrNick = params.get("usrNick").toString();
		String usrPg = params.get("usrPg").toString();
		HashMap<String, Object> adminUser = iAdminService.getAdminUsrList(email, usrPg, usrNick);
		Object adminUserList = adminUser.get("list");
		Object adminUserPb = adminUser.get("pb");
		modelMap.put("list", adminUserList);
		modelMap.put("pb"  , adminUserPb);
		HashMap<String, Object> adminUsrAuth = iAdminService.adminUsrAuth(email);
		modelMap.put("auth" , adminUsrAuth);
		int cnt = iAdminService.getAccountCnt(email);
		modelMap.put("cnt" , cnt);
		return mapper.writeValueAsString(modelMap);
	}
	
	//updUsrAuth
	@RequestMapping(value = "/updUsrAuthAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updUsrAuthAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iAdminService.updUsrAuth(params);
		iUtilService.insertLog("클랜원 권한 수정", email, "변경 피클랜원 : " + params.get("usrEmail").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//updUsrDelAuth
	@RequestMapping(value = "/updUsrDelAuthAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updUsrDelAuthAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iAdminService.updUsrDelAuth(params);
		iUtilService.insertLog("클랜장 위임", email, "변경 피클랜원 : " + params.get("usrEmail").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//updUsrBan
	@RequestMapping(value = "/updUsrBanAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updUsrBanAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		iAdminService.updUsrBan(params);
		iUtilService.insertLog("클랜원 추방", email, "추방 클랜원 : " + params.get("usrEmail").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//getAdminWaitUsr
	@RequestMapping(value = "/getAdminWaitUsrAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getAdminWaitUsrAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		String pg = params.get("pg").toString();
		HashMap<String, Object> adminUser = iAdminService.getAdminWaitUsr(email, pg);
		Object adminUserList = adminUser.get("list");
		Object adminUserPb = adminUser.get("pb");
		modelMap.put("list", adminUserList);
		modelMap.put("pb"  , adminUserPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//agreeClanJoin
	@RequestMapping(value = "/agreeClanJoinAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String agreeClanJoinAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iAdminService.agreeClanJoin(params);
		iUtilService.insertLog("클랜 가입 승인", email, "승인 클랜원 : " + params.get("joinEmail").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//disagreeClanJoin
	@RequestMapping(value = "/disagreeClanJoinAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String disagreeClanJoinAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iAdminService.disagreeClanJoin(params);
		iUtilService.insertLog("클랜 가입 반려", email, "반려 클랜원 : " + params.get("joinEmail").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//getAdminLogo
	@RequestMapping(value = "/getAdminLogoAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getAdminLogoAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		HashMap<String, Object> data = iAdminService.getAdminLogo(email);
		modelMap.put("data", data);
		return mapper.writeValueAsString(modelMap);
	}
	
	//updBaseLogo
	@RequestMapping(value = "/updBaseLogoAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updBaseLogoAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		iAdminService.updBaseLogo(email);
		iUtilService.insertLog("클랜 로고 변경", email, "기본 이미지로 변경");
		return mapper.writeValueAsString(modelMap);
	}
	
	//newBaseLogo
	@RequestMapping(value = "/newBaseLogoAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String newBaseLogoAjax(HttpSession session, @RequestParam(value="file", required=false) MultipartFile multipartFile , @RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		HashMap<String, Object> clanNm = iAdminService.newBaseLogo(email);
		File targetFile = new File("../webapps/source/img/clan/" + clanNm.get("NM").toString() + params.get("adminLogoTxt")+ ".png");
		try {
			InputStream fileStream = multipartFile.getInputStream();
			FileUtils.copyInputStreamToFile(fileStream, targetFile);
			fileStream.close();
			iAdminService.newBaseLogoUpd(params);
			iUtilService.insertLog("클랜 로고 변경", email, "파일 명 : " + clanNm.get("NM").toString() + params.get("adminLogoTxt")+ ".png");
		} catch (IOException e) {
			FileUtils.deleteQuietly(targetFile);
			e.printStackTrace();
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	//getClanLogoHist
	@RequestMapping(value = "/getClanLogoHistAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getClanLogoHistAjax(HttpSession session, @RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		String pg = params.get("pg").toString();
		HashMap<String, Object> adminLogoHist = iAdminService.getClanLogoHist(email, pg);
		Object adminLogoHistList = adminLogoHist.get("list");
		Object adminLogoHistPb = adminLogoHist.get("pb");
		modelMap.put("list", adminLogoHistList);
		modelMap.put("pb"  , adminLogoHistPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getAdminGameList
	@RequestMapping(value = "/getAdminGameListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getAdminGameListAjax(HttpSession session, @RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		String adminGamePg = params.get("pg").toString();
		String ym = params.get("ym").toString();
		if(params.get("no") == null||params.get("no") == "") {
			HashMap<String, Object> gameDocNo = iAdminService.getAdminGameDocNo(params);
			if(gameDocNo!=null) {
				modelMap.put("no", gameDocNo.get("NO").toString());
			}
			else {
				modelMap.put("no", "");
			}
		}
		else {
			modelMap.put("no", params.get("no").toString());
		}
		HashMap<String, Object> getAdminGameData = iAdminService.getAdminGameList(email, adminGamePg, ym);
		Object getAdminGameDataList = getAdminGameData.get("list");
		Object getAdminGameDataPb = getAdminGameData.get("pb");
		modelMap.put("list", getAdminGameDataList);
		modelMap.put("pb"  , getAdminGameDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getAdminGameDoc
	@RequestMapping(value = "/getAdminGameDocAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getAdminGameDocAjax(HttpSession session, @RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		HashMap<String, Object> data = new HashMap<String, Object>();
		List<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		if(params.get("no") == null||params.get("no") == "") {
			HashMap<String, Object> gameInsDocNo = iAdminService.getAdminGameDocNo(params);
			if(gameInsDocNo!=null) {
				params.put("no", gameInsDocNo.get("NO").toString());
				data = iAdminService.getadminGameDoc(params);
				list = iAdminService.getadminGameDocList(params);
			}
		}
		else {
			data = iAdminService.getadminGameDoc(params);
			list = iAdminService.getadminGameDocList(params);
		}
		modelMap.put("data", data);
		modelMap.put("list", list);
		return mapper.writeValueAsString(modelMap);
	}
	
	//updateWinTeamAdmin
	@RequestMapping(value = "/updateWinTeamAdminAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updateWinTeamAdminAjax(HttpSession session, @RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		iAdminService.updateWinTeamAdmin(params);
		iUtilService.insertLog("게임 데이터 수정 (승패)", params.get("sEmail").toString(), "게임 번호 : " + params.get("no").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//updGameData
	@RequestMapping(value = "/updGameDataAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updGameDataAjax(HttpSession session, @RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		iAdminService.updGameData(params);
		iUtilService.insertLog("게임 데이터 수정", params.get("sEmail").toString(), 
				               "게임 번호 : " + params.get("no").toString() + " | " +
	            			   "피 대상자 : " + params.get("email").toString() 
				              );
		return mapper.writeValueAsString(modelMap);
	}
	
	//delGame
	@RequestMapping(value = "/delGameAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String delGameAjax(HttpSession session, @RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		iAdminService.delGame(params);
		iUtilService.insertLog("게임 데이터 삭제", params.get("sEmail").toString(), "게임 번호 : " + params.get("no").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//chkRefGame
	@RequestMapping(value = "/chkRefGameAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String chkRefGameAjax(HttpSession session, @RequestParam HashMap<String,String> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> chkRefGameBlank = iAdminService.chkRefGameBlank(params);
		if(chkRefGameBlank.get("RESULT").toString().equals("pass")){
			HashMap<String, Object> chkRefGamePre = iAdminService.chkRefGamePre(params);
			int cnt = Integer.parseInt(chkRefGamePre.get("CNT").toString());
			if(cnt==0){
				iAdminService.refGame(params);
				iUtilService.insertLog("게임 결과 반영", params.get("sEmail").toString(), "게임 번호 : " + params.get("no").toString());
				modelMap.put("result", "success");
			}
			else {
				modelMap.put("result", "fail_pre");
			}
		}
		else if(chkRefGameBlank.get("RESULT").toString().equals("dup_email")) {
			modelMap.put("result", "fail_dup_email");
		}
		else if(chkRefGameBlank.get("RESULT").toString().equals("dup_champ")) {
			modelMap.put("result", "fail_dup_champ");
		}
		else {
			modelMap.put("result", "fail_blank");
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	
	//getAdminElo
	@RequestMapping(value = "/getAdminEloUsrAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getAdminEloUsrAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> getAdminEloUsrData = iAdminService.getAdminEloUsrData(params);
		Object getAdminEloUsrList = getAdminEloUsrData.get("list");
		Object getAdminEloUsrpb = getAdminEloUsrData.get("pb");
		modelMap.put("list", getAdminEloUsrList);
		modelMap.put("pb"  , getAdminEloUsrpb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getAdminEloList
	@RequestMapping(value = "/getAdminEloListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getAdminEloListAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> getAdminEloListData = iAdminService.getAdminEloListData(params);
		Object getAdminEloList = getAdminEloListData.get("list");
		Object getAdminElopb = getAdminEloListData.get("pb");
		modelMap.put("list", getAdminEloList);
		modelMap.put("pb"  , getAdminElopb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//updEloHist
	@RequestMapping(value = "/updEloHistAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updEloHistAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		iAdminService.updEloHist(params);
		iUtilService.insertLog("Elo 수정", params.get("sEmail").toString(), "피 대상자 : " + params.get("usrEmail").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//initElo
	@RequestMapping(value = "/initEloAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String initEloAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		iAdminService.initElo(params);
		iUtilService.insertLog("Elo 전체 초기화", params.get("sEmail").toString(),"");
		return mapper.writeValueAsString(modelMap);
	}
	
	//updNotice
	@RequestMapping(value = "/updNoticeAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String updNoticeAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		iAdminService.updNotice(params);
		iUtilService.insertLog("클랜 한줄 공지 수정", params.get("sEmail").toString(),"");
		return mapper.writeValueAsString(modelMap);
	}
	
	
}
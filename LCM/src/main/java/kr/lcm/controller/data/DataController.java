package kr.lcm.controller.data;

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
import kr.lcm.service.data.DataService;
import kr.lcm.service.common.UtilService;

@Controller
public class DataController {
	
	@SuppressWarnings("unused")
	private static final Logger log = LoggerFactory.getLogger(DataController.class);

	@Autowired
	public DataService iDataService;
	
	@Autowired
	public UtilService iUtilService;
	
	//getEloRankData
	@RequestMapping(value = "/getEloRankDataAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getEloRankDataAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> getEloRankData = iDataService.getEloRankData(params);
		Object getEloRankDataList = getEloRankData.get("list");
		Object getEloRankDataPb = getEloRankData.get("pb");
		modelMap.put("list", getEloRankDataList);
		modelMap.put("pb"  , getEloRankDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getEloHistData
	@RequestMapping(value = "/getEloHistDataAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getEloHistDataAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> getEloHistData = iDataService.getEloHistData(params);
		Object getEloHistDataList = getEloHistData.get("list");
		Object getEloHistDataPb = getEloHistData.get("pb");
		modelMap.put("list", getEloHistDataList);
		modelMap.put("pb"  , getEloHistDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getDataList
	@RequestMapping(value = "/getDataListAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getDataListAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> gameInsDocNo = new HashMap<String, Object>();
		if(params.get("no") == null||params.get("no") == "") {
			gameInsDocNo = iDataService.getMaxGameNo(params);
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
		HashMap<String, Object> getGameData = iDataService.getDataList(params);
		Object getDataList = getGameData.get("list");
		Object getDataPb = getGameData.get("pb");
		modelMap.put("list", getDataList);
		modelMap.put("pb"  , getDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getDataDoc
	@RequestMapping(value = "/getDataDocAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getDataDocAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		HashMap<String, Object> data = new HashMap<String, Object>();
		List<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		if(params.get("no") == null||params.get("no") == "") {
			HashMap<String, Object> gameInsDocNo = iDataService.getMaxGameNo(params);
			if(gameInsDocNo!=null) {
				params.put("no", gameInsDocNo.get("NO").toString());
				data = iDataService.getDataGameDoc(params);
				list = iDataService.getDataGameList(params);
			}
		}
		else {
			data = iDataService.getDataGameDoc(params);
			list = iDataService.getDataGameList(params);
		}
		modelMap.put("data", data);
		modelMap.put("list", list);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getUsrInfo
	@RequestMapping(value = "/chkSearchAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String chkSearchAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> info = iDataService.getUsrInfo(params);
		if(info==null||info.isEmpty()) {
			modelMap.put("result", "fail_noUsr");
		}
		else {
			List<HashMap<String, Object>> champList = iDataService.getChampTop5List(params);
			if(champList==null||champList.isEmpty()) {
				modelMap.put("result", "fail_noGame");
			}
			else {
				List<HashMap<String, Object>> data = iDataService.getwdRate(params);
				for(int i=0; i<data.size(); i++) {
					modelMap.put(data.get(i).get("FLG").toString(), data.get(i));
				}
				modelMap.put("list", champList);
				modelMap.put("info", info);
				modelMap.put("result", "pass");
			}
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	//getSearchGameData
	@RequestMapping(value = "/getSearchGameDataAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getSearchGameDataAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> getGameData = iDataService.getSearchGameList(params);
		Object getDataList = getGameData.get("list");
		Object getDataPb = getGameData.get("pb");
		modelMap.put("list", getDataList);
		modelMap.put("pb"  , getDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getDiv1Data
	@RequestMapping(value = "/getDiv1DataAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getDiv1DataAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> getGameData = iDataService.getDiv1Data(params);
		Object getDataList = getGameData.get("list");
		Object getDataPb = getGameData.get("pb");
		modelMap.put("list", getDataList);
		modelMap.put("pb"  , getDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getDiv2Data
	@RequestMapping(value = "/getDiv2DataAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getDiv2DataAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> getGameData = iDataService.getDiv2Data(params);
		Object getDataList = getGameData.get("list");
		Object getDataPb = getGameData.get("pb");
		modelMap.put("list", getDataList);
		modelMap.put("pb"  , getDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getDiv1Data
	@RequestMapping(value = "/getDiv3DataAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getDiv3DataAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> getGameData = iDataService.getDiv3Data(params);
		Object getDataList = getGameData.get("list");
		Object getDataPb = getGameData.get("pb");
		modelMap.put("list", getDataList);
		modelMap.put("pb"  , getDataPb);
		return mapper.writeValueAsString(modelMap);
	}
	
	//getDataGamePopup
	@RequestMapping(value = "/getDataGamePopupAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getDataGamePopupAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("sEmail", email);
		HashMap<String, Object> data = iDataService.getDataGameDoc(params);
		List<HashMap<String, Object>> list = iDataService.getDataGameList(params);
		modelMap.put("data", data);
		modelMap.put("list", list);
		return mapper.writeValueAsString(modelMap);
	}
	
}
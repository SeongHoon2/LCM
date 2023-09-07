package kr.lcm.controller.board;

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
import kr.lcm.service.board.BoardService;
import kr.lcm.service.common.UtilService;

@Controller
public class BoardController {
	
	@SuppressWarnings("unused")
	private static final Logger log = LoggerFactory.getLogger(CommonController.class);
	
	@Autowired
	public BoardService iBoardService;
	
	@Autowired
	public UtilService iUtilService;
	
	//drawBoard
	@RequestMapping(value = "/getDrawBoardAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getDrawBoardAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		String email = session.getAttribute("sEmail").toString();
		List<HashMap<String, Object>> boardCtgList = iBoardService.boardCtgList(email); 
		
		if(boardCtgList == null || boardCtgList.isEmpty()) {
			modelMap.put("result", "noBoardCtg");
		}
		else {
			int ctgNo = 0;
			String pg = params.get("boardPage").toString();
			String sarchFlg = params.get("sarchFlg").toString();
			String sarchTxt = params.get("sarchTxt").toString();
			
			if(params.get("boardCtg").toString().equals("")) {
				ctgNo = Integer.parseInt(boardCtgList.get(0).get("NO").toString());
			}
			else {
				ctgNo = Integer.parseInt(params.get("boardCtg").toString());
			}
			HashMap<String, Object> boardDocData = iBoardService.boardDocList(email, ctgNo, pg, sarchFlg, sarchTxt);
			
			Object boardDocList = boardDocData.get("list");
			Object boardDocPb = boardDocData.get("pb");
			
			modelMap.put("result", "success");
			modelMap.put("boardCtgList", boardCtgList);
			modelMap.put("boardDocList", boardDocList);
			modelMap.put("boardDocPb"  , boardDocPb);
		}
		return mapper.writeValueAsString(modelMap);
	}
	
	//getBoardList
	@RequestMapping(value = "/drawBoardMenuAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String drawBoardMenuAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		List<HashMap<String, Object>> boardCtgList = iBoardService.boardCtgList(email); 
		modelMap.put("boardCtgList", boardCtgList);
		return mapper.writeValueAsString(modelMap);
	}
	
	//boardWrite
	@RequestMapping(value = "/boardWriteAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String boardWriteAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iBoardService.boardWrite(params); 
		iUtilService.insertLog("게시글 작성", params.get("email").toString(), "게시판 번호 : " + params.get("boardCtg").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//getDrawBoard
	@RequestMapping(value = "/getDrawBoardDocAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getDrawBoardDocAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		HashMap<String, Object> boardDoc = iBoardService.getDrawBoardDoc(params);
		modelMap.put("data", boardDoc);
		return mapper.writeValueAsString(modelMap);
	}
	
	//writeReple
	@RequestMapping(value = "/writeRepleAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String writeRepleAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iBoardService.writeReple(params);
		iUtilService.insertLog("댓글 작성", params.get("email").toString(), "게시판 번호 : " + params.get("boardCtg").toString() + " | 문서 번호 : " + params.get("boardNo").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//getDrawBoardReple
	@RequestMapping(value = "/getDrawBoardRepleAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String getDrawBoardRepleAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		String email = session.getAttribute("sEmail").toString();
		String boardCtg = params.get("boardCtg").toString();
		String boardNo = params.get("boardNo").toString();
		String boardReplePg = params.get("boardReplePg").toString();
		HashMap<String, Object> boardDocReple = iBoardService.getBoardDocReple(email, boardCtg, boardNo, boardReplePg);
		Object boardDocRepleList = boardDocReple.get("list");
		Object boardDocReplePb = boardDocReple.get("pb");
		modelMap.put("list", boardDocRepleList);
		modelMap.put("pb"  , boardDocReplePb);
		
		return mapper.writeValueAsString(modelMap);
	}
	
	//delRep
	@RequestMapping(value = "/delRepAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String delRepAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iBoardService.delRep(params);
		iUtilService.insertLog("댓글 삭제", params.get("email").toString(), "게시판 번호 : " 
		                               + params.get("boardCtg").toString() + " | 문서 번호 : " 
				                       + params.get("boardNo").toString() + " | 댓글 번호 : " 
		                               + params.get("delRepNo").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//delDoc
	@RequestMapping(value = "/delDocAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String delDocAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iBoardService.delDoc(params);
		iUtilService.insertLog("게시글 삭제", params.get("email").toString(), "게시판 번호 : " 
		                               + params.get("boardCtg").toString() + " | 문서 번호 : " 
				                       + params.get("boardNo").toString());
		return mapper.writeValueAsString(modelMap);
	}
	
	//getUpdDoc
	@RequestMapping(value = "/setCKEditorDocAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String setCKEditorDocAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		HashMap<String, Object> boardDoc = iBoardService.getDrawBoardDoc(params);
		modelMap.put("data", boardDoc);
		return mapper.writeValueAsString(modelMap);
	}
	
	//boardUpdate
	@RequestMapping(value = "/boardUpdateAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String boardUpdateAjax(HttpSession session, @RequestParam HashMap<String, Object> params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		String email = session.getAttribute("sEmail").toString();
		params.put("email", email);
		iBoardService.boardUpdate(params); 
		iUtilService.insertLog("게시글 수정", params.get("email").toString(), 
				               "게시판 번호 : " + params.get("boardCtg").toString() + " | " +
				               "게시물 번호 : " + params.get("boardNo").toString()
 				              );
		return mapper.writeValueAsString(modelMap);
	}
	
}
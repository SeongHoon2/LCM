package kr.lcm.service.board;

import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.lcm.controller.common.CommonController;
import kr.lcm.mapper.board.BoardMapper;
import kr.lcm.service.common.PagingService;
import kr.lcm.model.common.PagingVO;

@Service
public class BoardServiceImpl implements BoardService{
	
	@Autowired
	private BoardMapper boardMapper;

	@Autowired
	private PagingService PagingService;
	
	private static final Logger log = LoggerFactory.getLogger(CommonController.class);

	//boardCtgList
	/**
	 * 게시판 메뉴 리스트 조회
	 * - 게시판의 메뉴 리스트를 조회한다.
	 * 
	 * <함수호출 예시>
	 * boardCtgList(email)
	 * @param str email 사용자 이메일
	 */
	@Override
	public List<HashMap<String, Object>> boardCtgList(String email) {
		return boardMapper.boardCtgList(email);
	}

	//boardDocList
	/**
	 * 게시판 문서 리스트 조회
	 * - 게시판의 문서 리스트를 조회한다.
	 * 
	 * <함수호출 예시>
	 * boardDocList(email, ctgNo, pNo, searchTxt)
	 * @param str email 사용자 이메일
	 * @param int ctgNo 문서 카테고리 (NO)
	 * @param str pNo 사용자 이메일
	 * @param str searchFlg 검색 조건 (0:제목 , 1:작성자)
	 * @param str searchTxt 검색어
	 */
	@Override
	public HashMap<String, Object> boardDocList(String email, int ctgNo, String pNo, String searchFlg, String searchTxt) {
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("email", email);
		params.put("ctgNo", Integer.toString(ctgNo));
		params.put("pNo", pNo);
		params.put("searchFlg", searchFlg);
		if(!searchTxt.equals("")) {
			searchTxt = "%"+searchTxt+"%";
		}
		params.put("searchTxt", searchTxt);
		
		int boardDocCnt = boardMapper.boardDocCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(pNo), boardDocCnt, 14, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = boardMapper.boardDocList(params);
		
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		
		return returnParams;
	}

	//boardWrite
	/**
	 * 게시물 작성
	 * - 게시물을 작성한다.
	 * 
	 * <함수호출 예시>
	 * boardWrite(params)
	 * @param str email 사용자 이메일
	 * @param int ctgNo 문서 카테고리 (NO)
	 */
	@Override
	public void boardWrite(HashMap<String, Object> params) {
		boardMapper.boardWrite(params);
	}

	//getDrawBoardDoc
	/**
	 * 게시물 조회
	 * - 게시물의 내용을 조회한다.
	 * 
	 * <함수호출 예시>
	 * getDrawBoardDoc(params)
	 * @param str boardNo 문서 번호
	 * @param int boardCtg 문서 카테고리 (NO)
	 */
	@Override
	public HashMap<String, Object> getDrawBoardDoc(HashMap<String, Object> params) {
		return boardMapper.getDrawBoardDoc(params);
	}

	//writeReple
	/**
	 * 문서 댓글 작성
	 * - 문서에 댓글을 작성한다.
	 * 
	 * <함수호출 예시>
	 * writeReple(params)
	 * @param str email      사용자 이메일
	 * @param str boardNo    문서 번호
	 * @param str boardCtg   게시판 카테고리
	 * @param str boardReple 댓글 내용
	 */
	@Override
	public void writeReple(HashMap<String, Object> params) {
		boardMapper.writeReple(params);
	}

	//getBoardDocReple
	/**
	 * 문서 댓글 리스트 조회
	 * - 문서의 댓글을 조회한다.
	 * 
	 * <함수호출 예시>
	 * getBoardDocReple(email, boardNo, boardCtg, boardReplePg)
	 * @param str email      사용자 이메일
	 * @param str boardNo    문서 번호
	 * @param str boardCtg   게시판 카테고리
	 * @param str boardReplePg 댓글 페이징 번호
	 */
	@Override
	public HashMap<String, Object> getBoardDocReple(String email, String boardCtg, String boardNo, String boardReplePg) {
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("email", email);
		params.put("boardCtg", boardCtg);
		params.put("boardNo", boardNo);
		params.put("boardReplePg", boardReplePg);
		
		int boardRepleCnt = boardMapper.boardRepleCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(boardReplePg), boardRepleCnt, 5, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = boardMapper.boardRepleList(params);
		
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		
		return returnParams;
	}

	//delRep
	/**
	 * 문서 댓글 삭제
	 * - 문서의 댓글을 삭제한다.
	 * 
	 * <함수호출 예시>
	 * delRep(params)
	 * @param str email      사용자 이메일
	 * @param str boardNo    문서 번호
	 * @param str boardCtg   게시판 카테고리
	 * @param str delRepNo   삭제 댓글 번호
	 */
	@Override
	public void delRep(HashMap<String, Object> params) {
		boardMapper.delRep(params);
	}

	//delDoc
	/**
	 * 문서 삭제
	 * - 문서를 삭제한다.
	 * - 해당 문서 번호에 존재하는 댓글들도 같이 삭제한다.
	 * <함수호출 예시>
	 * delDoc(params)
	 * @param str email      사용자 이메일
	 * @param str boardNo    문서 번호
	 * @param str boardCtg   게시판 카테고리
	 */
	@Override
	public void delDoc(HashMap<String, Object> params) {
		boardMapper.delDoc(params);
		boardMapper.delDocRep(params);
	}


	//boardUpdate
	/**
	 * 문서 수정
	 * - 문서를 수정한다.
	 * <함수호출 예시>
	 * boardUpdate(params)
	 * @param str email      사용자 이메일
	 * @param str boardNo    문서 번호
	 * @param str boardCtg   게시판 카테고리
	 */
	@Override
	public void boardUpdate(HashMap<String, Object> params) {
		boardMapper.boardUpdate(params);
	}
	
}
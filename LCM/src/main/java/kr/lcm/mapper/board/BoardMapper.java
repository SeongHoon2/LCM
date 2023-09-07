package kr.lcm.mapper.board;

import java.util.HashMap;
import java.util.List;

public interface BoardMapper {

	List<HashMap<String, Object>> boardCtgList(String email);

	int boardDocCnt(HashMap<String, String> params);

	List<HashMap<String, Object>> boardDocList(HashMap<String, String> params);

	void boardWrite(HashMap<String, Object> params);

	HashMap<String, Object> getDrawBoardDoc(HashMap<String, Object> params);

	void writeReple(HashMap<String, Object> params);

	HashMap<String, Object> getBoardDocReple(String email, String boardCtg, String boardNo, String boardReplePg);

	int boardRepleCnt(HashMap<String, String> params);

	List<HashMap<String, Object>> boardRepleList(HashMap<String, String> params);

	void delRep(HashMap<String, Object> params);

	void delDoc(HashMap<String, Object> params);

	void delDocRep(HashMap<String, Object> params);

	void boardUpdate(HashMap<String, Object> params);
	
}
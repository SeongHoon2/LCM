package kr.lcm.service.board;

import java.util.HashMap;
import java.util.List;

public interface BoardService {

	List<HashMap<String, Object>> boardCtgList(String email);

	HashMap<String, Object> boardDocList(String email, int ctgNo, String pNo, String searchFlg, String searchTxt);

	void boardWrite(HashMap<String, Object> params);

	HashMap<String, Object> getDrawBoardDoc(HashMap<String, Object> params);

	void writeReple(HashMap<String, Object> params);

	HashMap<String, Object> getBoardDocReple(String email, String boardCtg, String boardNo, String boardReplePg);

	void delRep(HashMap<String, Object> params);

	void delDoc(HashMap<String, Object> params);

	void boardUpdate(HashMap<String, Object> params);

}

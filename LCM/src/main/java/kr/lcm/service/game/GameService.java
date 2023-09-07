package kr.lcm.service.game;

import java.util.HashMap;
import java.util.List;

public interface GameService {

	void makeGame(HashMap<String, Object> params);

	List<HashMap<String, Object>> getGameMakeMenu(String email);

	HashMap<String, Object> getGameInsList(String email, String gameInsPg, String ym);

	HashMap<String, Object> getGameInsDocNo(HashMap<String, Object> params);

	HashMap<String, Object> getGameInsDoc(HashMap<String, Object> params);

	List<HashMap<String, Object>> getGameInsDocList(HashMap<String, Object> params);

	List<HashMap<String, Object>> getGameInsUsrList(HashMap<String, Object> params);

	List<HashMap<String, Object>> getChampList(HashMap<String, Object> params);

	void insGameData(HashMap<String, Object> params);

	void updateWinTeam(HashMap<String, Object> params);

}

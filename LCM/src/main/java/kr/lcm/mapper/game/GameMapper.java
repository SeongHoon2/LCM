package kr.lcm.mapper.game;

import java.util.HashMap;
import java.util.List;

public interface GameMapper {

	void makeGame(HashMap<String, Object> params);

	HashMap<String, Object> makeGame(String email);

	List<HashMap<String, Object>> getGameMakeMenu(String email);

	HashMap<String, Object> getGameInsList(String email, String gameInsPg);

	int gameInsCnt(HashMap<String, String> params);

	List<HashMap<String, Object>> gameInsList(HashMap<String, String> params);

	HashMap<String, Object> getGameInsDocNo(HashMap<String, Object> params);

	HashMap<String, Object> getGameInsDoc(HashMap<String, Object> params);

	List<HashMap<String, Object>> getGameInsDocList(HashMap<String, Object> params);

	List<HashMap<String, Object>> getGameInsUsrList(HashMap<String, Object> params);

	List<HashMap<String, Object>> getChampList(HashMap<String, Object> params);

	void insGameData_B_1(HashMap<String, Object> params);

	void insGameData_B_2(HashMap<String, Object> params);
	
	void insGameData_B_3(HashMap<String, Object> params);
	
	void insGameData_B_4(HashMap<String, Object> params);
	
	void insGameData_B_5(HashMap<String, Object> params);
	
	void insGameData_R_1(HashMap<String, Object> params);

	void insGameData_R_2(HashMap<String, Object> params);
	
	void insGameData_R_3(HashMap<String, Object> params);
	
	void insGameData_R_4(HashMap<String, Object> params);
	
	void insGameData_R_5(HashMap<String, Object> params);

	void updateWinTeam(HashMap<String, Object> params);
}
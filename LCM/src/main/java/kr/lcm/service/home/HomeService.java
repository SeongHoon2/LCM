package kr.lcm.service.home;

import java.util.HashMap;
import java.util.List;

import kr.lcm.model.common.ClanVO;
import kr.lcm.model.user.AccountVO;

public interface HomeService {

	List<HashMap<String, Object>> getClanList();

	void joinClan(AccountVO accountVo);
	
	void joinDuplicateClan(AccountVO accountVo);
	
	public HashMap<String, Object> checkClanNm(HashMap<String, Object> params);

	void makeClan(ClanVO clanVo);

	HashMap<String, Object> getHomeInfo(String sEmail);

	HashMap<String, Object> getHomeElo(HashMap<String, Object> params);

	HashMap<String, Object> getHomeGame(HashMap<String, Object> params);

	List<HashMap<String, Object>> getHomeBoard(String sEmail);

	HashMap<String, Object> getWaitingClan(String sEmail);

	void cancelAccount(String sEmail);

}

package kr.lcm.mapper.home;

import java.util.HashMap;
import java.util.List;

import kr.lcm.model.common.ClanVO;
import kr.lcm.model.user.AccountVO;

public interface HomeMapper {

	List<HashMap<String, Object>> getClanList();

	void joinClan(AccountVO accountVo);
	
	void joinClanDuplicate_ins(AccountVO accountVo);
	
	void joinClanDuplicate_del(AccountVO accountVo);

	HashMap<String, Object> checkClanNm(HashMap<String, Object> params);

	void makeClan(ClanVO clanVo);

	void joinClanDuplicate_eloHist(AccountVO accountVo);

	HashMap<String, Object> getHomeInfo_data(String sEmail);

	List<HashMap<String, Object>> getHomeInfo_mList(String sEmail);

	List<HashMap<String, Object>> getHomeInfo_wList(String sEmail);

	int getHomeEloCnt(HashMap<String, Object> params);

	List<HashMap<String, Object>> getHomeEloList(HashMap<String, Object> params);

	int getHomeGameCnt(HashMap<String, Object> params);

	List<HashMap<String, Object>> getHomeGameList(HashMap<String, Object> params);

	List<HashMap<String, Object>> getHomeBoard(String sEmail);

	HashMap<String, Object> getWaitingClan(String sEmail);

	void cancelAccount_wact(String sEmail);
	
	void cancelAccount_act(String sEmail);


}
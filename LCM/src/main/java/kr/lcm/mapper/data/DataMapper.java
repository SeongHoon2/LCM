package kr.lcm.mapper.data;

import java.util.HashMap;
import java.util.List;

public interface DataMapper {

	int eloRankCnt(HashMap<String, Object> params);

	List<HashMap<String, Object>> eloRankList(HashMap<String, Object> params);

	int eloHistCnt(HashMap<String, Object> params);

	List<HashMap<String, Object>> eloHistList(HashMap<String, Object> params);

	HashMap<String, Object> getMaxGameNo(HashMap<String, Object> params);

	int gameInsCnt(HashMap<String, Object> params);

	List<HashMap<String, Object>> gameInsList(HashMap<String, Object> params);

	HashMap<String, Object> getDataGameDoc(HashMap<String, Object> params);

	List<HashMap<String, Object>> getDataGameList(HashMap<String, Object> params);

	List<HashMap<String, Object>> getChampTop5List(HashMap<String, Object> params);

	HashMap<String, Object> getUsrInfo(HashMap<String, Object> params);

	List<HashMap<String, Object>> getwdRate(HashMap<String, Object> params);

	int getSearchGameListCnt(HashMap<String, Object> params);

	List<HashMap<String, Object>> getSearchGameList(HashMap<String, Object> params);

	int getDivDataCnt(HashMap<String, Object> params);

	List<HashMap<String, Object>> getDiv1DataList(HashMap<String, Object> params);
	
	List<HashMap<String, Object>> getDiv2DataList(HashMap<String, Object> params);
	
	List<HashMap<String, Object>> getDiv3DataList(HashMap<String, Object> params);
	
}
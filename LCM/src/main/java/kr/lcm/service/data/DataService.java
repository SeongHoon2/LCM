package kr.lcm.service.data;

import java.util.HashMap;
import java.util.List;

public interface DataService {

	HashMap<String, Object> getEloRankData(HashMap<String, Object> params);

	HashMap<String, Object> getEloHistData(HashMap<String, Object> params);

	HashMap<String, Object> getMaxGameNo(HashMap<String, Object> params);

	HashMap<String, Object> getDataList(HashMap<String, Object> params);

	HashMap<String, Object> getDataGameDoc(HashMap<String, Object> params);

	List<HashMap<String, Object>> getDataGameList(HashMap<String, Object> params);

	List<HashMap<String, Object>> getChampTop5List(HashMap<String, Object> params);

	HashMap<String, Object> getUsrInfo(HashMap<String, Object> params);

	List<HashMap<String, Object>> getwdRate(HashMap<String, Object> params);

	HashMap<String, Object> getSearchGameList(HashMap<String, Object> params);

	HashMap<String, Object> getDiv1Data(HashMap<String, Object> params);
	
	HashMap<String, Object> getDiv2Data(HashMap<String, Object> params);
	
	HashMap<String, Object> getDiv3Data(HashMap<String, Object> params);

}

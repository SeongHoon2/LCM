package kr.lcm.service.data;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.lcm.mapper.data.DataMapper;
import kr.lcm.model.common.PagingVO;
import kr.lcm.service.common.PagingService;

@Service
public class DataServiceImpl implements DataService{

	@Autowired
	private DataMapper dataMapper;

	@Autowired
	private PagingService PagingService;
	
	@Override
	public HashMap<String, Object> getEloRankData(HashMap<String, Object> params) {
		int eloRankCnt = dataMapper.eloRankCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("rnkPg").toString()), eloRankCnt, 14, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = dataMapper.eloRankList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getEloHistData(HashMap<String, Object> params) {
		int eloHistCnt = dataMapper.eloHistCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("histPg").toString()), eloHistCnt, 14, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = dataMapper.eloHistList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getMaxGameNo(HashMap<String, Object> params) {
		return dataMapper.getMaxGameNo(params);
	}

	@Override
	public HashMap<String, Object> getDataList(HashMap<String, Object> params) {
		int gameCnt = dataMapper.gameInsCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("pg").toString()), gameCnt, 10, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = dataMapper.gameInsList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getDataGameDoc(HashMap<String, Object> params) {
		return dataMapper.getDataGameDoc(params);
	}

	@Override
	public List<HashMap<String, Object>> getDataGameList(HashMap<String, Object> params) {
		return dataMapper.getDataGameList(params);
	}

	@Override
	public List<HashMap<String, Object>> getChampTop5List(HashMap<String, Object> params) {
		return dataMapper.getChampTop5List(params);
	}

	@Override
	public HashMap<String, Object> getUsrInfo(HashMap<String, Object> params) {
		return dataMapper.getUsrInfo(params);
	}

	@Override
	public List<HashMap<String, Object>> getwdRate(HashMap<String, Object> params) {
		return dataMapper.getwdRate(params);
	}

	@Override
	public HashMap<String, Object> getSearchGameList(HashMap<String, Object> params) {
		int gameCnt = dataMapper.getSearchGameListCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("gamePg").toString()), gameCnt, 6, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = dataMapper.getSearchGameList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getDiv1Data(HashMap<String, Object> params) {
		int gameCnt = dataMapper.getDivDataCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("dataPg1").toString()), gameCnt, 8, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = dataMapper.getDiv1DataList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getDiv2Data(HashMap<String, Object> params) {
		int gameCnt = dataMapper.getDivDataCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("dataPg2").toString()), gameCnt, 8, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = dataMapper.getDiv2DataList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getDiv3Data(HashMap<String, Object> params) {
		int gameCnt = dataMapper.getDivDataCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("dataPg3").toString()), gameCnt, 8, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = dataMapper.getDiv3DataList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}
}
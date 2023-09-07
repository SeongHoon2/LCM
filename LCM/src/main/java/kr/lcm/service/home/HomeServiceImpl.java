package kr.lcm.service.home;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.lcm.mapper.home.HomeMapper;
import kr.lcm.model.common.ClanVO;
import kr.lcm.model.common.PagingVO;
import kr.lcm.model.user.AccountVO;
import kr.lcm.service.common.PagingService;

@Service
public class HomeServiceImpl implements HomeService{

	
	@Autowired
	private HomeMapper homeMapper;

	@Autowired
	private PagingService PagingService;
	
	@Override
	public List<HashMap<String, Object>> getClanList() {
		return homeMapper.getClanList();
	}

	@Override
	public void joinClan(AccountVO accountVo) {
		homeMapper.joinClan(accountVo);
	}
	
	@Override
	public void joinDuplicateClan(AccountVO accountVo) {
		homeMapper.joinClanDuplicate_eloHist(accountVo);
		homeMapper.joinClanDuplicate_ins(accountVo);
		homeMapper.joinClanDuplicate_del(accountVo);
	}

	@Override
	public HashMap<String, Object> checkClanNm(HashMap<String, Object> params) {
		return homeMapper.checkClanNm(params);
	}

	@Override
	public void makeClan(ClanVO clanVo) {
		homeMapper.makeClan(clanVo);
	}

	@Override
	public HashMap<String, Object> getHomeInfo(String sEmail) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		HashMap<String, Object> data = homeMapper.getHomeInfo_data(sEmail);
		List<HashMap<String, Object>> mList = homeMapper.getHomeInfo_mList(sEmail);
		List<HashMap<String, Object>> wList = homeMapper.getHomeInfo_wList(sEmail);
		returnParams.put("data", data);
		returnParams.put("mList", mList);
		returnParams.put("wList", wList);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getHomeElo(HashMap<String, Object> params) {
		int eloHistCnt = homeMapper.getHomeEloCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("eloPg").toString()), eloHistCnt, 14, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = homeMapper.getHomeEloList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getHomeGame(HashMap<String, Object> params) {
		int gameCnt = homeMapper.getHomeGameCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("gamePg").toString()), gameCnt, 5, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = homeMapper.getHomeGameList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public List<HashMap<String, Object>> getHomeBoard(String sEmail) {
		return homeMapper.getHomeBoard(sEmail);
	}

	@Override
	public HashMap<String, Object> getWaitingClan(String sEmail) {
		return homeMapper.getWaitingClan(sEmail);
	}

	@Override
	public void cancelAccount(String sEmail) {
		homeMapper.cancelAccount_wact(sEmail);
		homeMapper.cancelAccount_act(sEmail);
	}

}
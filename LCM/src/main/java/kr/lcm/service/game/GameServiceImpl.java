package kr.lcm.service.game;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.lcm.mapper.game.GameMapper;
import kr.lcm.model.common.PagingVO;
import kr.lcm.service.common.PagingService;

@Service
public class GameServiceImpl implements GameService{

	@Autowired
	private GameMapper gameMapper;
	
	@Autowired
	private PagingService PagingService;
	
	@Override
	public void makeGame(HashMap<String, Object> params) {
		gameMapper.makeGame(params);
	}

	@Override
	public List<HashMap<String, Object>> getGameMakeMenu(String email) {
		return gameMapper.getGameMakeMenu(email);
	}

	@Override
	public HashMap<String, Object> getGameInsList(String email, String gameInsPg, String ym) {
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("sEmail", email);
		params.put("ym", ym);
		int gameInsCnt = gameMapper.gameInsCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(gameInsPg), gameInsCnt, 10, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = gameMapper.gameInsList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getGameInsDocNo(HashMap<String, Object> params) {
		return gameMapper.getGameInsDocNo(params);
	}

	@Override
	public HashMap<String, Object> getGameInsDoc(HashMap<String, Object> params) {
		return gameMapper.getGameInsDoc(params);
	}

	@Override
	public List<HashMap<String, Object>> getGameInsDocList(HashMap<String, Object> params) {
		return gameMapper.getGameInsDocList(params);
	}

	@Override
	public List<HashMap<String, Object>> getGameInsUsrList(HashMap<String, Object> params) {
		return gameMapper.getGameInsUsrList(params);
	}

	@Override
	public List<HashMap<String, Object>> getChampList(HashMap<String, Object> params) {
		return gameMapper.getChampList(params);
	}

	@Override
	public void insGameData(HashMap<String, Object> params) {
		if(params.get("flg").toString().equals("B_1")) {
			gameMapper.insGameData_B_1(params);
		}
		if(params.get("flg").toString().equals("B_2")) {
			gameMapper.insGameData_B_2(params);
		}
		if(params.get("flg").toString().equals("B_3")) {
			gameMapper.insGameData_B_3(params);
		}
		if(params.get("flg").toString().equals("B_4")) {
			gameMapper.insGameData_B_4(params);
		}
		if(params.get("flg").toString().equals("B_5")) {
			gameMapper.insGameData_B_5(params);
		}
		if(params.get("flg").toString().equals("R_1")) {
			gameMapper.insGameData_R_1(params);
		}
		if(params.get("flg").toString().equals("R_2")) {
			gameMapper.insGameData_R_2(params);
		}
		if(params.get("flg").toString().equals("R_3")) {
			gameMapper.insGameData_R_3(params);
		}
		if(params.get("flg").toString().equals("R_4")) {
			gameMapper.insGameData_R_4(params);
		}
		if(params.get("flg").toString().equals("R_5")) {
			gameMapper.insGameData_R_5(params);
		}
		
	}

	@Override
	public void updateWinTeam(HashMap<String, Object> params) {
		gameMapper.updateWinTeam(params);
	}
}
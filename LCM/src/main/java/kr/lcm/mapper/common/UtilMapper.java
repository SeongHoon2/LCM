package kr.lcm.mapper.common;

import java.util.HashMap;

import kr.lcm.model.common.LogVO;
import kr.lcm.model.user.AccountVO;

public interface UtilMapper {
	
	public void insertLog(LogVO logVo);

	public HashMap<String, Object> checkClan(AccountVO accountVo);

	public HashMap<String, String> checkClanNick(AccountVO accountVo);

	public HashMap<String, Object> getSessionNick(HashMap<String, Object> params);
}
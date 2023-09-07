package kr.lcm.service.common;

import java.util.HashMap;

import kr.lcm.model.user.AccountVO;

public interface UtilService {
	
	public void insertLog(String ctg, String email, String note);
	
	public void sendMail(HashMap<String, String> mailMap);

	public HashMap<String, Object> checkClan(AccountVO accountVo);
	
	public HashMap<String, String> checkClanNick(AccountVO accountVo);

	public HashMap<String, Object> getSessionNick(HashMap<String, Object> params);

}

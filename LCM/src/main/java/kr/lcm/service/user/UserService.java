package kr.lcm.service.user;

import java.util.HashMap;

import kr.lcm.model.user.UserVO;

public interface UserService {
	
    public HashMap<String, String> chkLogin(UserVO params);

	public HashMap<String, String> chkJoin(UserVO params);

	public void join(UserVO params);

	public HashMap<String, String> chkFind(UserVO params);

	public void updatePw(UserVO params);

	public HashMap<String, String> chkAuthEmail(UserVO params);

	public void updateAuthEmail(UserVO params);

	public HashMap<String, String> updPwChk(HashMap<String, Object> params);

	public void updPw(HashMap<String, Object> params);

	public HashMap<String, Object> chkMypageClan(String sEmail);

	public void updMypageClan(HashMap<String, Object> params);

	public HashMap<String, Object> chkClanSecAjax(String sEmail);

	public void clanSecAjax(String sEmail);

	public void lcmSecAjax(String sEmail);
}

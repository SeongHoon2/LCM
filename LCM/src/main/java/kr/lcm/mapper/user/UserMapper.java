package kr.lcm.mapper.user;

import java.util.HashMap;

import kr.lcm.model.user.AccountVO;
import kr.lcm.model.user.UserVO;

public interface UserMapper {
	
	public HashMap<String, String> chkLogin(UserVO params);

	public HashMap<String, String> chkJoin(UserVO params);

	public void join(UserVO params);

	public HashMap<String, String> chkFind(UserVO params);

	public void updatePw(UserVO params);

	public HashMap<String, String> chkAuthEmail(UserVO params);

	public void updateAuthEmail(UserVO params);

}
package kr.lcm.service.user;

import java.util.HashMap;

import kr.lcm.model.common.LogVO;
import kr.lcm.model.user.AccountVO;
import kr.lcm.model.user.UserVO;

public interface UserService {
	
    public HashMap<String, String> chkLogin(UserVO params);

	public HashMap<String, String> chkJoin(UserVO params);

	public void join(UserVO params);

	public HashMap<String, String> chkFind(UserVO params);

	public void updatePw(UserVO params);

	public HashMap<String, String> chkAuthEmail(UserVO params);

	public void updateAuthEmail(UserVO params);
}

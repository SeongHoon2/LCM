package kr.lcm.service.user;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.lcm.mapper.user.UserMapper;
import kr.lcm.model.user.AccountVO;
import kr.lcm.model.user.UserVO;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserMapper userMapper;

	@Override
	public HashMap<String, String> chkLogin(UserVO params) {
		return userMapper.chkLogin(params);
	}

	@Override
	public HashMap<String, String> chkJoin(UserVO params) {
		return userMapper.chkJoin(params);
	}

	@Override
	public void join(UserVO params) {
		userMapper.join(params);
	}

	@Override
	public HashMap<String, String> chkFind(UserVO params) {
		return userMapper.chkFind(params);
	}

	@Override
	public void updatePw(UserVO params) {
		userMapper.updatePw(params);
	}

	@Override
	public HashMap<String, String> chkAuthEmail(UserVO params) {
		return userMapper.chkAuthEmail(params);
	}

	@Override
	public void updateAuthEmail(UserVO params) {
		userMapper.updateAuthEmail(params);
	}
}

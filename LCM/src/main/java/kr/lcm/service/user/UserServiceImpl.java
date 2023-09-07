package kr.lcm.service.user;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.lcm.mapper.user.UserMapper;
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
	

	@Override
	public HashMap<String, String> updPwChk(HashMap<String, Object> params) {
		return userMapper.updPwChk(params);
	}

	@Override
	public void updPw(HashMap<String, Object> params) {
		userMapper.updPw(params);
	}

	@Override
	public HashMap<String, Object> chkMypageClan(String sEmail) {
		return userMapper.chkMypageClan(sEmail);
	}

	@Override
	public void updMypageClan(HashMap<String, Object> params) {
		userMapper.updMypageClan(params);
	}

	@Override
	public HashMap<String, Object> chkClanSecAjax(String sEmail) {
		return userMapper.chkClanSecAjax(sEmail);
	}

	@Override
	public void clanSecAjax(String sEmail) {
		userMapper.clanSecAjax_ins(sEmail);
		userMapper.clanSecAjax_del(sEmail);
	}

	@Override
	public void lcmSecAjax(String sEmail) {
		userMapper.lcmSecAjax_ins(sEmail);
		userMapper.lcmSecAjax_del(sEmail);
	}


}
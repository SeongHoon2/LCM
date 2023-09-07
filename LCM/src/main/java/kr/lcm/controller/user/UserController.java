package kr.lcm.controller.user;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Random;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.lcm.controller.common.CommonController;
import kr.lcm.model.user.UserVO;
import kr.lcm.service.common.UtilService;
import kr.lcm.service.user.UserService;

@Controller
public class UserController {
	
	@SuppressWarnings("unused")
	private static final Logger log = LoggerFactory.getLogger(CommonController.class);
	
	@Autowired
	public UserService iUserService;
	
	@Autowired
	public UtilService iUtilService;
	
	//Login
	@RequestMapping(value = "/loginAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String loginAjax(UserVO params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		String SHA = null;
		String pw = params.getPw();
	    try {
	        MessageDigest sh = MessageDigest.getInstance("SHA-256");
	        sh.update(pw.getBytes()); 
	        byte byteData[] = sh.digest();
	        StringBuffer sb = new StringBuffer(); 
	        for(int i = 0 ; i < byteData.length ; i++){
	            sb.append(Integer.toString((byteData[i]&0xff) + 0x100, 16).substring(1));
	        }
	        SHA = sb.toString();
	    } catch(NoSuchAlgorithmException e){
	        e.printStackTrace(); 
	    }
	    params.setPw(SHA);
		
	    HashMap<String, String> loginChk = iUserService.chkLogin(params);
	    
	    if(loginChk != null && !loginChk.isEmpty()) {
	    	if(loginChk.get("EMAIL_AUTH").toString().equals("pass")) {
	    		session.setAttribute("sEmail", params.getEmail());
	    		session.setMaxInactiveInterval(1800);
	    		modelMap.put("result", "success");
	    		iUtilService.insertLog("로그인", session.getAttribute("sEmail").toString(), "");
	    	}
	    	else {
	    		modelMap.put("result", "email_auth");
	    	}
	    }
	    else {
	    	modelMap.put("result", "fail");
	    }

		return mapper.writeValueAsString(modelMap);
	}
	
	//Logout
	@RequestMapping(value = "/logoutAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public void logoutAjax(HttpSession session) throws Throwable {
		iUtilService.insertLog("로그아웃", session.getAttribute("sEmail").toString(), "");
		session.invalidate();
	}
	
	//Join
	@RequestMapping(value = "/joinAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String joinAjax(UserVO params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		HashMap<String, String> joinChk = iUserService.chkJoin(params);
		
		if(joinChk != null && !joinChk.isEmpty()) {
			if(joinChk.get("FLG").toString().equals("DUPLICATE")) {
				modelMap.put("result", "fail_duplicate");
			}
			else {
				modelMap.put("result", "fail_withdraw");
			}
		}
		else {
			String SHA = null;
			String pw = params.getPw();
			try {
				MessageDigest sh = MessageDigest.getInstance("SHA-256");
				sh.update(pw.getBytes()); 
				byte byteData[] = sh.digest();
				StringBuffer sb = new StringBuffer(); 
				for(int i = 0 ; i < byteData.length ; i++){
					sb.append(Integer.toString((byteData[i]&0xff) + 0x100, 16).substring(1));
				}
				SHA = sb.toString();
			} catch(NoSuchAlgorithmException e){
				e.printStackTrace(); 
			}
			params.setPw(SHA);
			
			Random random = new Random();
			int createNum = 0;
			String ranNum = "";
			String resultNum = "";
			
			for (int i=0; i<8; i++) {
				createNum = random.nextInt(9);
				ranNum =  Integer.toString(createNum);
				resultNum += ranNum;
			}	
			
			params.setEmail_auth(resultNum);

			iUserService.join(params);
			iUtilService.insertLog("회원가입", params.getEmail().toString(), "");
			
			HashMap<String, String> mailMap = new HashMap<String, String>();
			mailMap.put("email", params.getEmail().toString());
			mailMap.put("title", "[발신전용]LCM 본인인증 메일입니다.");
			mailMap.put("con", "LCM 홈페이지에서 로그인 후 아래의 번호로 본인인증을 완료해주세요.<br>"+params.getEmail_auth().toString());
			iUtilService.sendMail(mailMap);
			
			modelMap.put("result", "success");
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	
	//Find
	@RequestMapping(value = "/findAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String findAjax(UserVO params) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		HashMap<String, String> findChk = iUserService.chkFind(params);
		
		if(findChk == null || findChk.isEmpty()) {
			modelMap.put("result", "fail");
		}
		else {
			Random random = new Random();
			int createNum = 0;
			String ranNum = "";
			String resultNum = "";
			
			for (int i=0; i<10; i++) {
				createNum = random.nextInt(9);
				ranNum =  Integer.toString(createNum);
				resultNum += ranNum;
			}	
			
			String SHA = null;
			String pw  = resultNum;
			try {
				MessageDigest sh = MessageDigest.getInstance("SHA-256");
				sh.update(pw.getBytes()); 
				byte byteData[] = sh.digest();
				StringBuffer sb = new StringBuffer(); 
				for(int i = 0 ; i < byteData.length ; i++){
					sb.append(Integer.toString((byteData[i]&0xff) + 0x100, 16).substring(1));
				}
				SHA = sb.toString();
			} catch(NoSuchAlgorithmException e){
				e.printStackTrace(); 
			}
			params.setPw(SHA);
			
			iUserService.updatePw(params);
			iUtilService.insertLog("비밀번호 찾기", params.getEmail().toString(), "");
			
			HashMap<String, String> mailMap = new HashMap<String, String>();
			mailMap.put("email", params.getEmail().toString());
			mailMap.put("title", "[발신전용]LCM 비밀번호 찾기 메일입니다.");
			mailMap.put("con", "LCM 홈페이지에서 아래의 비밀번호로 로그인해주세요.<br>"+resultNum);
			iUtilService.sendMail(mailMap);
			
			modelMap.put("result", "success");
		}
		
		return mapper.writeValueAsString(modelMap);
	}
	
	//AuthEmail
	@RequestMapping(value = "/authEmailAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String authEmailAjax(UserVO params, HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		
		HashMap<String, String> chkAuthEmail = iUserService.chkAuthEmail(params);
		
		if(chkAuthEmail == null || chkAuthEmail.isEmpty()) {
			modelMap.put("result", "fail");
		}
		else {
			iUtilService.insertLog("이메일 인증", params.getEmail().toString(), "인증 성공");
			iUserService.updateAuthEmail(params);
    		session.setAttribute("sEmail", params.getEmail());
    		session.setMaxInactiveInterval(1800);
    		iUtilService.insertLog("로그인", session.getAttribute("sEmail").toString(), "");
			modelMap.put("result", "success");
		}
		
		return mapper.writeValueAsString(modelMap);
	}

}

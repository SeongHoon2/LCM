package kr.lcm.service.common;

import java.util.HashMap;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.lcm.mapper.common.UtilMapper;
import kr.lcm.model.common.LogVO;
import kr.lcm.model.user.AccountVO;
import kr.lcm.util.SMTPAuthenticatior;

@Service
public class UtilServiceImpl implements UtilService{
	
	@Autowired
	private UtilMapper utilMapper;

	//sendMail
	/**
	 * 로그 적재
	 * - 사용자의 서버 사용 로그를 저장한다.
	 * 
	 * @param ctg   로그 구분
	 * @param email 사용자 이메일
	 * @param note  로그 상세 내용
	 */
	@Override
	public void insertLog(String ctg, String email, String note) {
		LogVO logVo = new LogVO();
		logVo.setCtg(ctg);
		logVo.setEmail(email);
		logVo.setNote(note);
		utilMapper.insertLog(logVo);
	}

	//sendMail
	/**
	 * Mail 전송
	 * - smtp를 통하여 메일을 전송한다. (구글 smtp 사용)
	 * 
	 * <함수호출 예시>
	 * sendMail(mailMap);
	 * @param mailMap : HashMap<String, String> map
	 * @param email 받는 사람 메일
	 * @param title 메일 제목
	 * @param con   메일 내용
	 */
	@Override
	public void sendMail(HashMap<String, String> mailMap) {
		String from = "LCM";
		String to = mailMap.get("email").toString();
		String subject =  mailMap.get("title").toString();
		String content =  mailMap.get("con").toString();
		
		Properties properties = new Properties();
		properties.put("mail.smtp.port", "587");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.auth", "true");
        
		try{
			//인증정보
		    Authenticator auth = new SMTPAuthenticatior();
		    Session ses = Session.getInstance(properties, auth);
		    
		    //메세지 생성
		    MimeMessage msg = new MimeMessage(ses);
		    
		    //보내는 사람 메일주소
		    Address fromAddr = new InternetAddress(from);
		    msg.setFrom(fromAddr);
		    
		    //받는 사람 메일주소
		    Address toAddr = new InternetAddress(to);
		    msg.addRecipient(Message.RecipientType.TO, toAddr);

		    //제목,내용
		    msg.setSubject(subject);
		    msg.setContent(content, "text/html;charset=UTF-8");
		    
		    //전송
		    Transport.send(msg);
		} catch(Exception e){
		    e.printStackTrace();
		}
	}

	//checkClan
	/**
	 * 클랜 가입 확인
	 * - 클랜 가입 여부를 확인한다.
	 * 
	 * <함수호출 예시>
	 * checkClan(accountVo);
	 * @param params : sEmail
	 */
	@Override
	public HashMap<String, Object> checkClan(AccountVO accountVo) {
		return utilMapper.checkClan(accountVo);
	}

	//checkClanNick
	/**
	 * 닉네임 중복 여부확인
	 * - 클랜 내 닉네임 중복이 있는지 확인한다.
	 * 
	 * <함수호출 예시>
	 * checkClanNick(accountVo);
	 * @param accountVo 사용자VO
	 * @param clan 클랜명
	 * @param nick 사용 닉네임
	 */
	@Override
	public HashMap<String, String> checkClanNick(AccountVO accountVo) {
		return utilMapper.checkClanNick(accountVo);
	}

	//getSessionNick
	/**
	 * 세션 닉네임 가져오기
	 * - 세션 닉네임을 가져온다.
	 * 
	 * <함수호출 예시>
	 * getSessionNick(params);
	 * @param email 세션 email
	 */
	@Override
	public HashMap<String, Object> getSessionNick(HashMap<String, Object> params) {
		return utilMapper.getSessionNick(params);
	}
}

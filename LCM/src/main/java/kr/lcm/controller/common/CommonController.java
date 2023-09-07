package kr.lcm.controller.common;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.lcm.model.user.AccountVO;
import kr.lcm.service.common.UtilService;
import kr.lcm.service.user.UserService;

@Controller
public class CommonController {
	
	@SuppressWarnings("unused")
	private static final Logger log = LoggerFactory.getLogger(CommonController.class);
	
	@Autowired
	public UserService iUserService;

	@Autowired
	public UtilService iUtilService;
	
	//index Redirect
	@RequestMapping(value = "/", method = {RequestMethod.GET, RequestMethod.POST})
	public String index() {
		return "redirect:/home/home";
	}

	//PageControll
	/**
	 * 페이지 이동 요청 처리.
	 * - "/페이지위치/페이지" 경로를 가진 화면으로 이동한다. 
	 * - 파라미터 처리를 위해 return 을 ModelAndView 로 변경한다.
	 * 
	 * <화면요청 예시>
	 * /main/login
	 * 
	 * @param pageLocation 페이지위치
	 * @param page         페이지명
	 * @throws IOException 
	 */
	@ResponseBody
	@RequestMapping(value = "/{pageLocation}/{page}", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView pageController(@PathVariable String pageLocation, @PathVariable String page, HttpSession session, HttpServletResponse response) throws IOException {
		ModelAndView mav = new ModelAndView();
		
		String url = "";
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
		//세션이 있는 상태로 로그인 페이지에 접속하면 home 화면으로 redirect
		if(page.equals("login")) {
			if(session.getAttribute("sEmail")!=null&&session.getAttribute("sEmail")!="") {
				url = "redirect:/home/home";
			}
			else {
				url = pageLocation+"/"+page;
			}
		}
		//예외 처리(로그인 불필요)
		else if(pageLocation.contains("home")||page.contains("terms")){
			url = pageLocation+"/"+page;
		}
		//세션 검증(로그인)
		else if(session.getAttribute("sEmail")==null||session.getAttribute("sEmail")=="") {
			out.println("<script>alert(\"로그인이 필요합니다.\");location.replace(\"/user/login\");</script>");
			out.flush();
		}
		else if(page.equals("mypageInfo")||page.equals("mypageClan")||page.equals("mypageSec")){
			if(session.getAttribute("sEmail")==null||session.getAttribute("sEmail")=="") {
				url = "redirect:/home/home";
			}
			else {
				url = pageLocation+"/"+page;
			}
		}
		else {
			AccountVO params = new AccountVO();
			params.setEmail(session.getAttribute("sEmail").toString());
			HashMap<String, Object> checkClan = iUtilService.checkClan(params);
			if(checkClan!=null&&!checkClan.isEmpty()) {
				if(pageLocation.contains("board") ||
						pageLocation.contains("data")  ||
						pageLocation.contains("game")
					   ) {
					if(Integer.parseInt(checkClan.get("AUTH").toString())==0) {
						out.println("<script>alert(\"클랜장의 가입 승인이 필요합니다.\");location.replace(\"/home/home\");</script>");
						out.flush();
					}
					//클랜 가입 정상 상태
					else {
						url = pageLocation+"/"+page;
					}
				}
				else if(pageLocation.contains("admin")) {
					if(Integer.parseInt(checkClan.get("AUTH").toString())==2||Integer.parseInt(checkClan.get("AUTH").toString())==3) {
						url = pageLocation+"/"+page;
					}
					else {
						out.println("<script>alert(\"권한이 없습니다.\");location.replace(\"/home/home\");</script>");
						out.flush();
					}
				}
			}
			//클랜 미가입상태 home
			else{
				out.println("<script>alert(\"클랜 가입이 필요합니다.\");location.replace(\"/home/home\");</script>");
				out.flush();
			}
		}
		mav.setViewName(url);
		return mav;
	}
	
	//CheckSession
	/**
	 * 로그인 세션 확인
	 * - 로그인 세션을 확인하여 result를 return.
	 * 
	 * @param result : "success, noSession"
	 */
	@RequestMapping(value = "/checkSessionAjax", method = RequestMethod.POST, produces = "text/json;charset=UTF-8")
	@ResponseBody public String checkSessionAjax(HttpSession session) throws Throwable {
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, Object> modelMap = new HashMap<String, Object>();
		if(session.getAttribute("sEmail")!=null&&session.getAttribute("sEmail")!=""){
			modelMap.put("result", "success");
		}
		else {
			modelMap.put("result", "noSession");
		}
		return mapper.writeValueAsString(modelMap);
	}
}
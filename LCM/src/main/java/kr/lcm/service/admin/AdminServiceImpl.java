package kr.lcm.service.admin;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.lcm.controller.common.CommonController;
import kr.lcm.mapper.admin.AdminMapper;
import kr.lcm.model.common.PagingVO;
import kr.lcm.model.game.gameVO;
import kr.lcm.service.common.PagingService;


@Service
public class AdminServiceImpl implements AdminService{
	
	private static final Logger log = LoggerFactory.getLogger(CommonController.class);
	
	@Autowired
	private AdminMapper adminMapper;

	@Autowired
	private PagingService PagingService;
	
	//adminBoardList
	/**
	 * 게시판 카테고리 리스트 조회
	 * - 게시판의 카테고리 리스트를 조회한다.
	 * 
	 * <함수호출 예시>
	 * adminBoardList(email)
	 * @param str email 사용자 이메일
	 */
	@Override
	public List<HashMap<String, Object>> adminBoardList(String email) {
		return adminMapper.adminBoardList(email);
	}

	//addCtg
	/**
	 * 게시판 카테고리 추가
	 * - 게시판 카테고리를 추가한다.
	 * 
	 * <함수호출 예시>
	 * addCtg(params)
	 * @param str email 사용자 이메일
	 * @param str addAdminBoardTxt 카테고리 명
	 */
	@Override
	public void addCtg(HashMap<String, Object> params) {
		adminMapper.addCtg(params);
	}

	//delCtg
	/**
	 * 게시판 카테고리 추가
	 * - 게시판 카테고리를 추가한다.
	 * - 삭제되는 게시판의 뒷 순서(sort)에 있는 게시판의 sort를 -1 해주고 해당 게시판을 삭제한다.
	 * <함수호출 예시>
	 * delCtg(params)
	 * @param str email 사용자 이메일
	 * @param str ctgDelNo 카테고리 번호
	 */
	@Override
	public void delCtg(HashMap<String, Object> params) {
		adminMapper.updCtg(params);
		adminMapper.delCtg(params);
	}

	//updCtg
	/**
	 * 게시판 카테고리명 수정
	 * - 게시판 카테고리명을 수정한다.
	 * <함수호출 예시>
	 * updCtg(params)
	 * @param str email 사용자 이메일
	 * @param str ctgDelNo 카테고리 번호
	 * @param str ctgUpdNm 카테고리 번호
	 */
	@Override
	public void updCtg(HashMap<String, Object> params) {
		adminMapper.updCtgNm(params);
	}

	//updCtgSort
	/**
	 * 게시판 카테고리 순서 수정
	 * - 게시판 카테고리 순서를 수정한다.
	 * <함수호출 예시>
	 * updCtgSort(params)
	 * @param str email 사용자 이메일
	 * @param str ctgUpd 카테고리 번호 + "구분자(|)"
	 */
	@Override
	public void updCtgSort(HashMap<String, Object> params) {
		String txt = params.get("ctgUpd").toString();
		List list = Arrays.asList(txt.split(",")); 
		for(int i=0; i<list.size(); i++) {
			HashMap<String, Object> param = new HashMap<String, Object>();
			param.put("email", params.get("email").toString());
			param.put("NO", list.get(i).toString());
			param.put("SORT", i+1);
			adminMapper.updCtgSort(param);
		}
	}

	//getAdminUsrList
	/**
	 * 회원 리스트 가져오기
	 * <함수호출 예시>
	 * getAdminUsrList(email, usrPg, usrNick)
	 * @param str email 사용자 이메일
	 * @param str usrPg 리스트 페이지 번호
	 * @param str usrNick 회원 닉네임 검색어
	 */
	@Override
	public HashMap<String, Object> getAdminUsrList(String email, String usrPg, String usrNick) {
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("email", email);
		params.put("usrPg", usrPg);
		if(!usrNick.equals("")) {
			usrNick = "%"+usrNick+"%";
		}
		params.put("usrNick", usrNick);
		
		int adminUsrCnt = adminMapper.adminUsrCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(usrPg), adminUsrCnt, 15, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = adminMapper.adminUsrList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	//adminUsrAuth
	/**
	 * 클랜 권한 가져오기
	 * <함수호출 예시>
	 * adminUsrAuth(email)
	 * @param str email 사용자 이메일
	 */
	@Override
	public HashMap<String, Object> adminUsrAuth(String email) {
		return adminMapper.adminUsrAuth(email);
	}

	//getAccountCnt
	/**
	 * 클랜원 수 가져오기
	 * <함수호출 예시>
	 * getAccountCnt(email)
	 * @param str email 사용자 이메일
	 */
	@Override
	public int getAccountCnt(String email) {
		return adminMapper.getAccountCnt(email);
	}

	//updUsrAuth
	/**
	 * 클랜원 권한 수정하기
	 * <함수호출 예시>
	 * updUsrAuth(params)
	 * @param str email 사용자 이메일
	 * @param str usrEmail 피대상자
	 */
	@Override
	public void updUsrAuth(HashMap<String, Object> params) {
		adminMapper.updUsrAuth(params);
	}

	//updUsrDelAuth
	/**
	 * 클랜원 권한 수정하기
	 * <함수호출 예시>
	 * updUsrDelAuth(params)
	 * @param str email 사용자 이메일
	 * @param str usrEmail 피대상자
	 */
	@Override
	public void updUsrDelAuth(HashMap<String, Object> params) {
		adminMapper.updUsrDelAuth_p(params);
		adminMapper.updUsrDelAuth_m(params);
	}

	//updUsrBan
	/**
	 * 클랜원 추방하기
	 * <함수호출 예시>
	 * updUsrBan(params)
	 * @param str email 사용자 이메일
	 * @param str usrEmail 피대상자
	 */
	@Override
	public void updUsrBan(HashMap<String, Object> params) {
		adminMapper.updUsrBan_ins(params);
		adminMapper.updUsrBan_del(params);
	}

	//getAdminWaitUsr
	/**
	 * 가입 대기 인원 리스트 가져오기
	 * <함수호출 예시>
	 * getAdminWaitUsr(email, pg)
	 * @param str email 사용자 이메일
	 * @param str pg 리스트 페이지 번호
	 */
	@Override
	public HashMap<String, Object> getAdminWaitUsr(String email, String pg) {
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("email", email);
		params.put("pg", pg);
		int adminWaitUsrCnt = adminMapper.adminWaitUsrCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(pg), adminWaitUsrCnt, 15, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = adminMapper.adminWaitUsrList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	//agreeClanJoin
	/**
	 * 클랜 가입 승인
	 * <함수호출 예시>
	 * agreeClanJoin(params)
	 * @param str email 사용자 이메일
	 * @param str joinEmail 승인 피클랜원
	 */
	@Override
	public void agreeClanJoin(HashMap<String, Object> params) {
		adminMapper.agreeClanJoin(params);
	}

	//disagreeClanJoin
	/**
	 * 클랜 가입 반려
	 * <함수호출 예시>
	 * disagreeClanJoin(params)
	 * @param str email 사용자 이메일
	 * @param str joinEmail 승인 피클랜원
	 */
	@Override
	public void disagreeClanJoin(HashMap<String, Object> params) {
		adminMapper.disagreeClanJoin_ins(params);
		adminMapper.disagreeClanJoin_del(params);
	}
	
	//getAdminLogo
	/**
	 * 클랜 이미지 url 가져오기
	 * <함수호출 예시>
	 * getAdminLogo(email)
	 * @param str email 사용자 이메일
	 */
	@Override
	public HashMap<String, Object> getAdminLogo(String email) {
		return adminMapper.getAdminLogo(email);
	}

	//updBaseLogo
	/**
	 * 클랜 이미지 기본이미지로 설정
	 * <함수호출 예시>
	 * updBaseLogo(email)
	 * @param str email 사용자 이메일
	 */
	@Override
	public void updBaseLogo(String email) {
		adminMapper.updBaseLogo(email);
		adminMapper.updBaseLogo_hist(email);
	}

	//newBaseLogo
	/**
	 * 클랜 이미지 db 적재를 위한 클랜명 호출
	 * <함수호출 예시>
	 * newBaseLogo(email)
	 * @param str email 사용자 이메일
	 */
	@Override
	public HashMap<String, Object> newBaseLogo(String email) {
		return adminMapper.newBaseLogo(email);
	}

	//newBaseLogoUpd
	/**
	 * 클랜 이미지 변경 후 db 적재
	 * <함수호출 예시>
	 * newBaseLogoUpd(params)
	 * @param str email 사용자 이메일
	 * @param str adminLogoTxt db 적재용 시간
	 */
	@Override
	public void newBaseLogoUpd(HashMap<String, String> params) {
		adminMapper.newBaseLogoUpd(params);
		adminMapper.newBaseLogoUpd_hist(params);
	}

	//getClanLogoHist
	/**
	 * 클랜 이미지 변경 히스토리 조회
	 * <함수호출 예시>
	 * getClanLogoHist(email, pg)
	 * @param str email 사용자 이메일
	 * @param str pg 페이징 번호
	 */
	@Override
	public HashMap<String, Object> getClanLogoHist(String email, String pg) {
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("email", email);
		params.put("pg", pg);
		int clanLogoHistCnt = adminMapper.clanLogoHistCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(pg), clanLogoHistCnt, 9, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = adminMapper.clanLogoHistList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getAdminGameDocNo(HashMap<String, String> params) {
		return adminMapper.getAdminGameDocNo(params);
	}

	@Override
	public HashMap<String, Object> getAdminGameList(String email, String adminGamePg, String ym) {
		HashMap<String, String> params = new HashMap<String, String>();
		params.put("email", email);
		params.put("ym", ym);
		int adminGameCnt = adminMapper.adminGameCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(adminGamePg), adminGameCnt, 10, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = adminMapper.adminGameList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getadminGameDoc(HashMap<String, String> params) {
		return adminMapper.getadminGameDoc(params);
	}

	@Override
	public List<HashMap<String, Object>> getadminGameDocList(HashMap<String, String> params) {
		return adminMapper.getadminGameDocList(params);
	}

	@Override
	public void updateWinTeamAdmin(HashMap<String, String> params) {
		adminMapper.updateWinTeamAdmin(params);
	}

	@Override
	public void updGameData(HashMap<String, String> params) {
		if(params.get("flg").toString().equals("B_1")) {
			adminMapper.updGameData_B_1(params);
		}
		if(params.get("flg").toString().equals("B_2")) {
			adminMapper.updGameData_B_2(params);
		}
		if(params.get("flg").toString().equals("B_3")) {
			adminMapper.updGameData_B_3(params);
		}
		if(params.get("flg").toString().equals("B_4")) {
			adminMapper.updGameData_B_4(params);
		}
		if(params.get("flg").toString().equals("B_5")) {
			adminMapper.updGameData_B_5(params);
		}
		if(params.get("flg").toString().equals("R_1")) {
			adminMapper.updGameData_R_1(params);
		}
		if(params.get("flg").toString().equals("R_2")) {
			adminMapper.updGameData_R_2(params);
		}
		if(params.get("flg").toString().equals("R_3")) {
			adminMapper.updGameData_R_3(params);
		}
		if(params.get("flg").toString().equals("R_4")) {
			adminMapper.updGameData_R_4(params);
		}
		if(params.get("flg").toString().equals("R_5")) {
			adminMapper.updGameData_R_5(params);
		}
	}

	@Override
	public void delGame(HashMap<String, String> params) {
		adminMapper.delGame(params);
	}

	@Override
	public HashMap<String, Object> chkRefGameBlank(HashMap<String, String> params) {
		return adminMapper.chkRefGameBlank(params);
	}

	@Override
	public HashMap<String, Object> chkRefGamePre(HashMap<String, String> params) {
		return adminMapper.chkRefGamePre(params);
	}

	@Override
	public void refGame(HashMap<String, String> params) {
		HashMap<String, Object> data = adminMapper.getRefGameData(params);
		//정기
		String flg = data.get("REG_FLG").toString();
		if(flg.equals("0")) {
			//가중치 50
			int weight = 50;
			//Blue 팀 평균 Elo (Dummy : 1500 고정) 
			int bTeamAvg = 0;
			bTeamAvg = Integer.parseInt(data.get("B_1_ELO").toString())
					 + Integer.parseInt(data.get("B_2_ELO").toString())
					 + Integer.parseInt(data.get("B_3_ELO").toString())
					 + Integer.parseInt(data.get("B_4_ELO").toString())
					 + Integer.parseInt(data.get("B_5_ELO").toString())
					;
			bTeamAvg = bTeamAvg/5;
			
			//Red 팀 평균 Elo (Dummy : 1500 고정) 
			int rTeamAvg = 0;
			rTeamAvg = Integer.parseInt(data.get("R_1_ELO").toString())
					 + Integer.parseInt(data.get("R_2_ELO").toString())
					 + Integer.parseInt(data.get("R_3_ELO").toString())
					 + Integer.parseInt(data.get("R_4_ELO").toString())
					 + Integer.parseInt(data.get("R_5_ELO").toString())
					;
			rTeamAvg = rTeamAvg/5;
			
			//승리 팀 계산 수치
			double bWinInt = 0;
			double rWinInt = 0;
			if(data.get("WIN").toString().equals("0")) {
				bWinInt = 1;
				rWinInt = 0;
			}
			else {
				bWinInt = 0;
				rWinInt = 1;
			}
			
			//각 인원의 예상 승률 (We) 계산
			double b_1_elo = Integer.parseInt(data.get("B_1_ELO").toString());
			double b_2_elo = Integer.parseInt(data.get("B_2_ELO").toString());
			double b_3_elo = Integer.parseInt(data.get("B_3_ELO").toString());
			double b_4_elo = Integer.parseInt(data.get("B_4_ELO").toString());
			double b_5_elo = Integer.parseInt(data.get("B_5_ELO").toString());
			double r_1_elo = Integer.parseInt(data.get("R_1_ELO").toString());
			double r_2_elo = Integer.parseInt(data.get("R_2_ELO").toString());
			double r_3_elo = Integer.parseInt(data.get("R_3_ELO").toString());
			double r_4_elo = Integer.parseInt(data.get("R_4_ELO").toString());
			double r_5_elo = Integer.parseInt(data.get("R_5_ELO").toString());
			double b_1_We = 1/(Math.pow(10 ,(rTeamAvg-b_1_elo)/400) +1);
			double b_2_We = 1/(Math.pow(10 ,(rTeamAvg-b_2_elo)/400) +1);
			double b_3_We = 1/(Math.pow(10 ,(rTeamAvg-b_3_elo)/400) +1);
			double b_4_We = 1/(Math.pow(10 ,(rTeamAvg-b_4_elo)/400) +1);
			double b_5_We = 1/(Math.pow(10 ,(rTeamAvg-b_5_elo)/400) +1);
			double r_1_We = 1/(Math.pow(10 ,(bTeamAvg-r_1_elo)/400) +1);
			double r_2_We = 1/(Math.pow(10 ,(bTeamAvg-r_2_elo)/400) +1);
			double r_3_We = 1/(Math.pow(10 ,(bTeamAvg-r_3_elo)/400) +1);
			double r_4_We = 1/(Math.pow(10 ,(bTeamAvg-r_4_elo)/400) +1);
			double r_5_We = 1/(Math.pow(10 ,(bTeamAvg-r_5_elo)/400) +1);
			
			//계산 이후 Elo, 증감 수치 계산
			double aft_b_1_elo = b_1_elo+weight*(bWinInt-b_1_We);
			double aft_b_2_elo = b_2_elo+weight*(bWinInt-b_2_We);
			double aft_b_3_elo = b_3_elo+weight*(bWinInt-b_3_We);
			double aft_b_4_elo = b_4_elo+weight*(bWinInt-b_4_We);
			double aft_b_5_elo = b_5_elo+weight*(bWinInt-b_5_We);
			double aft_r_1_elo = r_1_elo+weight*(rWinInt-r_1_We);
			double aft_r_2_elo = r_2_elo+weight*(rWinInt-r_2_We);
			double aft_r_3_elo = r_3_elo+weight*(rWinInt-r_3_We);
			double aft_r_4_elo = r_4_elo+weight*(rWinInt-r_4_We);
			double aft_r_5_elo = r_5_elo+weight*(rWinInt-r_5_We);
			double pm_b_1_elo = aft_b_1_elo-b_1_elo;
			double pm_b_2_elo = aft_b_2_elo-b_2_elo;
			double pm_b_3_elo = aft_b_3_elo-b_3_elo;
			double pm_b_4_elo = aft_b_4_elo-b_4_elo;
			double pm_b_5_elo = aft_b_5_elo-b_5_elo;
			double pm_r_1_elo = aft_r_1_elo-r_1_elo;
			double pm_r_2_elo = aft_r_2_elo-r_2_elo;
			double pm_r_3_elo = aft_r_3_elo-r_3_elo;
			double pm_r_4_elo = aft_r_4_elo-r_4_elo;
			double pm_r_5_elo = aft_r_5_elo-r_5_elo;
			
			int pm_b_1_elo_param = (int) Math.floor(pm_b_1_elo);
			int pm_b_2_elo_param = (int) Math.floor(pm_b_2_elo);
			int pm_b_3_elo_param = (int) Math.floor(pm_b_3_elo);
			int pm_b_4_elo_param = (int) Math.floor(pm_b_4_elo);
			int pm_b_5_elo_param = (int) Math.floor(pm_b_5_elo);
			int pm_r_1_elo_param = (int) Math.floor(pm_r_1_elo);
			int pm_r_2_elo_param = (int) Math.floor(pm_r_2_elo);
			int pm_r_3_elo_param = (int) Math.floor(pm_r_3_elo);
			int pm_r_4_elo_param = (int) Math.floor(pm_r_4_elo);
			int pm_r_5_elo_param = (int) Math.floor(pm_r_5_elo);
			int aft_b_1_elo_param = (int) Math.floor(aft_b_1_elo);
			int aft_b_2_elo_param = (int) Math.floor(aft_b_2_elo);
			int aft_b_3_elo_param = (int) Math.floor(aft_b_3_elo);
			int aft_b_4_elo_param = (int) Math.floor(aft_b_4_elo);
			int aft_b_5_elo_param = (int) Math.floor(aft_b_5_elo);
			int aft_r_1_elo_param = (int) Math.floor(aft_r_1_elo);
			int aft_r_2_elo_param = (int) Math.floor(aft_r_2_elo);
			int aft_r_3_elo_param = (int) Math.floor(aft_r_3_elo);
			int aft_r_4_elo_param = (int) Math.floor(aft_r_4_elo);
			int aft_r_5_elo_param = (int) Math.floor(aft_r_5_elo);
			
			data.put("aft_b_1_elo",aft_b_1_elo_param);
			data.put("pm_b_1_elo",pm_b_1_elo_param);
			data.put("aft_b_2_elo",aft_b_2_elo_param);
			data.put("pm_b_2_elo",pm_b_2_elo_param);
			data.put("aft_b_3_elo",aft_b_3_elo_param);
			data.put("pm_b_3_elo",pm_b_3_elo_param);
			data.put("aft_b_4_elo",aft_b_4_elo_param);
			data.put("pm_b_4_elo",pm_b_4_elo_param);
			data.put("aft_b_5_elo",aft_b_5_elo_param);
			data.put("pm_b_5_elo",pm_b_5_elo_param);
			data.put("aft_r_1_elo",aft_r_1_elo_param);
			data.put("pm_r_1_elo",pm_r_1_elo_param);
			data.put("aft_r_2_elo",aft_r_2_elo_param);
			data.put("pm_r_2_elo",pm_r_2_elo_param);
			data.put("aft_r_3_elo",aft_r_3_elo_param);
			data.put("pm_r_3_elo",pm_r_3_elo_param);
			data.put("aft_r_4_elo",aft_r_4_elo_param);
			data.put("pm_r_4_elo",pm_r_4_elo_param);
			data.put("aft_r_5_elo",aft_r_5_elo_param);
			data.put("pm_r_5_elo",pm_r_5_elo_param);
			
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("sEmail", params.get("sEmail").toString());
			paramMap.put("no", params.get("no").toString());
			List insEloList = new ArrayList<>();
			
			for(int i=1; i<6; i++){
				if(!data.get("B_"+i+"_EMAIL").toString().equals("DUMMY")) {
				gameVO gameVo= new gameVO();
				gameVo.setEmail_txt(data.get("B_"+i+"_EMAIL").toString());
				gameVo.setPre_elo(Integer.parseInt(data.get("B_"+i+"_ELO").toString()));
				gameVo.setPm_elo(Integer.parseInt(data.get("pm_b_"+i+"_elo").toString()));
				gameVo.setAft_elo(Integer.parseInt(data.get("aft_b_"+i+"_elo").toString()));
				
				insEloList.add(gameVo);
				}
			}
			
			for(int i=1; i<6; i++){
				if(!data.get("R_"+i+"_EMAIL").toString().equals("DUMMY")) {
					gameVO gameVo= new gameVO();
					gameVo.setEmail_txt(data.get("R_"+i+"_EMAIL").toString());
					gameVo.setPre_elo(Integer.parseInt(data.get("R_"+i+"_ELO").toString()));
					gameVo.setPm_elo(Integer.parseInt(data.get("pm_r_"+i+"_elo").toString()));
					gameVo.setAft_elo(Integer.parseInt(data.get("aft_r_"+i+"_elo").toString()));
					
					insEloList.add(gameVo);
				}
			}
			paramMap.put("insEloList", insEloList);
			
			adminMapper.insertEloHistGame(paramMap);
			adminMapper.updEloGameAccount(paramMap);
			adminMapper.updEloGameWithAccount(paramMap);
			adminMapper.updGameRef(params);
		}
		//수시
		else {
			adminMapper.updGameRefNoElo(params);
		}
	}

	@Override
	public HashMap<String, Object> getAdminEloUsrData(HashMap<String, Object> params) {
		String usrNick = params.get("usrNick").toString();
		if(!usrNick.equals("")) {
			usrNick = "%"+usrNick+"%";
		}
		params.put("usrNick", usrNick);
		int adminEloUsrCnt = adminMapper.adminEloUsrCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("usrPg").toString()), adminEloUsrCnt, 15, 5);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = adminMapper.adminEloUsrList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public HashMap<String, Object> getAdminEloListData(HashMap<String, Object> params) {
		int adminEloListCnt = adminMapper.adminEloListCnt(params);
		PagingVO pb = PagingService.getPageingBean(Integer.parseInt(params.get("eloPg").toString()), adminEloListCnt, 13, 10);
		String startCnt = Integer.toString(pb.getStartCount());
		String endCnt = Integer.toString(pb.getEndCount());
		params.put("startCnt", startCnt);
		params.put("endCnt", endCnt);
		List<HashMap<String, Object>> list = adminMapper.adminEloList(params);
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		returnParams.put("list", list);
		returnParams.put("pb", pb);
		return returnParams;
	}

	@Override
	public void updEloHist(HashMap<String, Object> params) {
		adminMapper.insEloHist(params);
		adminMapper.updElo(params);
	}

	@Override
	public void initElo(HashMap<String, Object> params) {
		adminMapper.initInsEloHist(params);
		adminMapper.initUpdElo(params);
	}

	@Override
	public void updNotice(HashMap<String, Object> params) {
		adminMapper.updNotice(params);
	}
	
	
}
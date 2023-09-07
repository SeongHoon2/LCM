package kr.lcm.mapper.admin;

import java.util.HashMap;
import java.util.List;

public interface AdminMapper {

	List<HashMap<String, Object>> adminBoardList(String email);

	void addCtg(HashMap<String, Object> params);

	void updCtg(HashMap<String, Object> params);
	
	void delCtg(HashMap<String, Object> params);

	void updCtgNm(HashMap<String, Object> params);

	void updCtgSort(HashMap<String, Object> param);

	int adminUsrCnt(HashMap<String, String> params);

	List<HashMap<String, Object>> adminUsrList(HashMap<String, String> params);

	HashMap<String, Object> adminUsrAuth(String email);

	int getAccountCnt(String email);

	void updUsrAuth(HashMap<String, Object> params);

	void updUsrDelAuth_p(HashMap<String, Object> params);

	void updUsrDelAuth_m(HashMap<String, Object> params);

	void updUsrBan_ins(HashMap<String, Object> params);
	
	void updUsrBan_del(HashMap<String, Object> params);

	int adminWaitUsrCnt(HashMap<String, String> params);

	List<HashMap<String, Object>> adminWaitUsrList(HashMap<String, String> params);

	void agreeClanJoin(HashMap<String, Object> params);

	void disagreeClanJoin_ins(HashMap<String, Object> params);
	
	void disagreeClanJoin_del(HashMap<String, Object> params);

	HashMap<String, Object> getAdminLogo(String email);

	void updBaseLogo(String email);

	HashMap<String, Object> newBaseLogo(String email);

	void newBaseLogoUpd(HashMap<String, String> params);

	void updBaseLogo_hist(String email);

	void newBaseLogoUpd_hist(HashMap<String, String> params);

	int clanLogoHistCnt(HashMap<String, String> params);

	List<HashMap<String, Object>> clanLogoHistList(HashMap<String, String> params);

	HashMap<String, Object> getAdminGameDocNo(HashMap<String, String> params);

	int adminGameCnt(HashMap<String, String> params);

	List<HashMap<String, Object>> adminGameList(HashMap<String, String> params);

	HashMap<String, Object> getadminGameDoc(HashMap<String, String> params);

	List<HashMap<String, Object>> getadminGameDocList(HashMap<String, String> params);

	void updateWinTeamAdmin(HashMap<String, String> params);

	void updGameData(HashMap<String, String> params);

	void updGameData_B_1(HashMap<String, String> params);
	
	void updGameData_B_2(HashMap<String, String> params);
	
	void updGameData_B_3(HashMap<String, String> params);
	
	void updGameData_B_4(HashMap<String, String> params);
	
	void updGameData_B_5(HashMap<String, String> params);
	
	void updGameData_R_1(HashMap<String, String> params);
	
	void updGameData_R_2(HashMap<String, String> params);
	
	void updGameData_R_3(HashMap<String, String> params);
	
	void updGameData_R_4(HashMap<String, String> params);
	
	void updGameData_R_5(HashMap<String, String> params);

	void delGame(HashMap<String, String> params);

	HashMap<String, Object> chkRefGameBlank(HashMap<String, String> params);

	HashMap<String, Object> chkRefGamePre(HashMap<String, String> params);

	HashMap<String, Object> getRefGameData(HashMap<String, String> params);

	void updGameRefNoElo(HashMap<String, String> params);

	void insertEloHistGame(HashMap<String, Object> paramMap);

	void updGameRef(HashMap<String, String> params);

	void updEloGameAccount(HashMap<String, Object> paramMap);
	
	void updEloGameWithAccount(HashMap<String, Object> paramMap);

	int adminEloUsrCnt(HashMap<String, Object> params);

	List<HashMap<String, Object>> adminEloUsrList(HashMap<String, Object> params);

	int adminEloListCnt(HashMap<String, Object> params);

	List<HashMap<String, Object>> adminEloList(HashMap<String, Object> params);

	void insEloHist(HashMap<String, Object> params);

	void updElo(HashMap<String, Object> params);

	void initInsEloHist(HashMap<String, Object> params);

	void initUpdElo(HashMap<String, Object> params);

	void updNotice(HashMap<String, Object> params);

}
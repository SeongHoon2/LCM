package kr.lcm.service.admin;

import java.util.HashMap;
import java.util.List;

public interface AdminService {

	List<HashMap<String, Object>> adminBoardList(String email);

	void addCtg(HashMap<String, Object> params);

	void delCtg(HashMap<String, Object> params);

	void updCtg(HashMap<String, Object> params);

	void updCtgSort(HashMap<String, Object> params);

	HashMap<String, Object> getAdminUsrList(String email, String usrPg, String usrNick);

	HashMap<String, Object> adminUsrAuth(String email);

	int getAccountCnt(String email);

	void updUsrAuth(HashMap<String, Object> params);

	void updUsrDelAuth(HashMap<String, Object> params);

	void updUsrBan(HashMap<String, Object> params);

	HashMap<String, Object> getAdminWaitUsr(String email, String pg);

	void agreeClanJoin(HashMap<String, Object> params);

	void disagreeClanJoin(HashMap<String, Object> params);

	HashMap<String, Object> getAdminLogo(String email);

	void updBaseLogo(String email);

	HashMap<String, Object> newBaseLogo(String email);

	void newBaseLogoUpd(HashMap<String, String> params);

	HashMap<String, Object> getClanLogoHist(String email, String pg);

	HashMap<String, Object> getAdminGameDocNo(HashMap<String, String> params);

	HashMap<String, Object> getAdminGameList(String email, String adminGamePg, String ym);

	HashMap<String, Object> getadminGameDoc(HashMap<String, String> params);

	List<HashMap<String, Object>> getadminGameDocList(HashMap<String, String> params);

	void updateWinTeamAdmin(HashMap<String, String> params);

	void updGameData(HashMap<String, String> params);

	void delGame(HashMap<String, String> params);

	HashMap<String, Object> chkRefGameBlank(HashMap<String, String> params);

	HashMap<String, Object> chkRefGamePre(HashMap<String, String> params);

	void refGame(HashMap<String, String> params);

	HashMap<String, Object> getAdminEloUsrData(HashMap<String, Object> params);

	HashMap<String, Object> getAdminEloListData(HashMap<String, Object> params);

	void updEloHist(HashMap<String, Object> params);

	void initElo(HashMap<String, Object> params);

	void updNotice(HashMap<String, Object> params);

	HashMap<String, Object> chkClanDel(String sEmail);

	void clanDel(String sEmail);

}

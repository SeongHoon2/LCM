package kr.lcm.model.user;

public class AccountVO {
	/* 사용자 이메일 */
    private String email;
    
    /* 사용자 클랜 */
    private String clan;
    
    /* 클랜 내 닉네임 */
    private String nick;
    
    /* 선호 라인 */
    private String prefer_line;
    
    /* 사용자 권한 */
    private int auth;
    
    /* 사용자 elo */
    private int elo;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getClan() {
		return clan;
	}

	public void setClan(String clan) {
		this.clan = clan;
	}

	public String getNick() {
		return nick;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public String getPrefer_line() {
		return prefer_line;
	}

	public void setPrefer_line(String prefer_line) {
		this.prefer_line = prefer_line;
	}

	public int getAuth() {
		return auth;
	}

	public void setAuth(int auth) {
		this.auth = auth;
	}

	public int getElo() {
		return elo;
	}

	public void setElo(int elo) {
		this.elo = elo;
	}

	@Override
	public String toString() {
		return "AccountVO [email=" + email + ", clan=" + clan + ", nick=" + nick + ", prefer_line=" + prefer_line
				+ ", auth=" + auth + ", elo=" + elo + "]";
	}
    
    
    
}
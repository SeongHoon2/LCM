package kr.lcm.model.user;

public class UserVO {
	/* 사용자 이메일 */
    private String email;
    
    /* 사용자 패스워드 */
    private String pw;
    
    /* 이메일 인증여부 */
    private String email_auth;
    
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getEmail_auth() {
		return email_auth;
	}

	public void setEmail_auth(String email_auth) {
		this.email_auth = email_auth;
	}

	@Override
	public String toString() {
		return "UserVO [email=" + email + ", pw=" + pw + ", email_auth=" + email_auth + "]";
	}

    
    
}
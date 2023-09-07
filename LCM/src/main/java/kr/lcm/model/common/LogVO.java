package kr.lcm.model.common;

public class LogVO {
	/* 로그 카테고리 */
    private String ctg;
    
	/* 접근 사용자 */
    private String email;
    
    /* 로그 상세 설명 */
    private String note;

	public String getCtg() {
		return ctg;
	}

	public void setCtg(String ctg) {
		this.ctg = ctg;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	@Override
	public String toString() {
		return "LogVO [ctg=" + ctg + ", email=" + email + ", note=" + note + "]";
	}
    
}

package kr.lcm.model.board;

public class BoardDocVO {
	/* 게시판 문서 번호 */
    private int no;
    
    /* 게시판 문서 클랜 */
    private String clan;
    
    /* 게시판 문서 카테고리 */
    private String ctg;
    
    /* 게시판 문서 제목 */
    private String title;
    
    /* 게시판 문서 내용 */
    private String con;
    
    /* 게시판 문서 작성자 */
    private String writer;
    
    /* 게시판 문서 작성일 */
    private String wdate;
    
    /* 게시판 문서 삭제여부 */
    private String del_yn;

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getClan() {
		return clan;
	}

	public void setClan(String clan) {
		this.clan = clan;
	}

	public String getCtg() {
		return ctg;
	}

	public void setCtg(String ctg) {
		this.ctg = ctg;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCon() {
		return con;
	}

	public void setCon(String con) {
		this.con = con;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getWdate() {
		return wdate;
	}

	public void setWdate(String wdate) {
		this.wdate = wdate;
	}

	public String getDel_yn() {
		return del_yn;
	}

	public void setDel_yn(String del_yn) {
		this.del_yn = del_yn;
	}

	@Override
	public String toString() {
		return "BoardDocVO [no=" + no + ", clan=" + clan + ", ctg=" + ctg + ", title=" + title + ", con=" + con
				+ ", writer=" + writer + ", wdate=" + wdate + ", del_yn=" + del_yn + "]";
	}
    
}
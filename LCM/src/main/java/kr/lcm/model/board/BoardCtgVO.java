package kr.lcm.model.board;

public class BoardCtgVO {
	/* 게시판 카테고리 SEQ */
    private int no;
    
    /* 게시판 카테고리 클랜 */
    private String clan;
    
    /* 게시판 카테고리 명 */
    private String nm;
   
    /* 게시판 카테고리 순서 */
    private int sort;

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

	public String getNm() {
		return nm;
	}

	public void setNm(String nm) {
		this.nm = nm;
	}

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	@Override
	public String toString() {
		return "BoardCtgVO [no=" + no + ", clan=" + clan + ", nm=" + nm + ", sort=" + sort + "]";
	}
    
}
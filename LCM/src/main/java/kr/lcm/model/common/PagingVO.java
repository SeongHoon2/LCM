package kr.lcm.model.common;

public class PagingVO {
	//페이지 게시글 시작번호
	int startCount;
	
	//페이지 게시글 종료번호
	int endCount;
	
	//마지막 페이지 번호
	int maxPcount;
	
	//현재 페이지 기준 시작 페이지 번호
	int startPcount;
	
	//현재 페이지 기준 종료 페이지 번호
	int endPcount;
	
	//Getter & Setter
	public int getStartCount() {
		return startCount;
	}
	
	public void setStartCount(int startCount) {
		this.startCount = startCount;
	}
	
	public int getEndCount() {
		return endCount;
	}
	
	public void setEndCount(int endCount) {
		this.endCount = endCount;
	}
	
	public int getMaxPcount() {
		return maxPcount;
	}
	
	public void setMaxPcount(int maxPcount) {
		this.maxPcount = maxPcount;
	}
	
	public int getStartPcount() {
		return startPcount;
	}
	
	public void setStartPcount(int startPcount) {
		this.startPcount = startPcount;
	}
	
	public int getEndPcount() {
		return endPcount;
	}
	
	public void setEndPcount(int endPcount) {
		this.endPcount = endPcount;
	}
}

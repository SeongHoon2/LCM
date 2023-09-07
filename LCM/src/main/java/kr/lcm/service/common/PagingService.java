package kr.lcm.service.common;

import kr.lcm.model.common.PagingVO;

public interface PagingService {
	
	// 테이블 시작row
	public int getStartCount(int page);

	// 테이블 종료row
	public int getEndCount(int page);

	// 페이징 최대 크기
	public int getMaxPcount(int maxCount);

	// 현재페이지 기준 시작페이지
	public int getStartPcount(int page);

	// 현재페이지 기준 종료페이지
	public int getEndPcount(int page, int maxCount);

	// 빈형식으로 취득
	public PagingVO getPageingBean(int page, int maxCount);

	/*
	 * Custom mode
	 */
	// 테이블 시작row
	public int getStartCount(int page, int viewCount);

	// 테이블 종료row
	public int getEndCount(int page, int viewCount);

	// 페이징 최대 크기
	public int getMaxPcount(int maxCount, int viewCount);

	// 현재페이지 기준 시작페이지
	public int getStartPcount(int page, int pageCount);

	// 현재페이지 기준 종료페이지
	public int getEndPcount(int page, int maxCount, 
							int viewCount, int pageCount);

	// 빈형식으로 취득
	public PagingVO getPageingBean(int page, int maxCount,
									 int viewCount, int pageCount);
}

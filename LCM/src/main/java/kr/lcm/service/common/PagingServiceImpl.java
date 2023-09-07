package kr.lcm.service.common;

import org.springframework.stereotype.Service;
import kr.lcm.model.common.PagingVO;

@Service
public class PagingServiceImpl implements PagingService{
	/*
	 * Paging
	 */
	//테이블 시작row
	@Override
	public int getStartCount(int page) {
		int startCount = 0;
		int viewCount = 3;
		startCount = (page - 1) * viewCount + 1;
		return startCount;
	}
	
	//테이블 종료row
	@Override
	public int getEndCount(int page) {
		int endCount = 0;
		endCount = page * 3;
		return endCount;
	}
	
	//페이징 최대 크기
	@Override
	public int getMaxPcount(int maxCount) {
		int maxPcount = 0;
		
		if(maxCount % 3 > 0){
			maxPcount = (maxCount / 3) + 1;
		} else {
			maxPcount = (maxCount / 3);
		}
		
		if(maxCount == 0) {
			maxPcount = 1;
		}
		
		return maxPcount;
	}
	
	//현재페이지 기준 시작페이지
	@Override
	public int getStartPcount(int page) {
		int startPcount = 0;
		
		if(page % 10 == 0 ) {
			startPcount = page - 10 + 1;
		} else {
			startPcount = ((page / 10) * 10) + 1;
		}
		
		return startPcount;
	}
	
	//현재페이지 기준 종료페이지
	@Override
	public int getEndPcount(int page, int maxCount) {
		int endPcount = 0;
		int maxPcount = getMaxPcount(maxCount);
		
		endPcount = getStartPcount(page) + 10 - 1;
		
		if(endPcount >= maxPcount){
			endPcount = maxPcount;
		}
		
		return endPcount;
	}
	
	//빈형식으로 취득
	@Override
	public PagingVO getPageingBean(int page, int maxCount) {
		PagingVO pb = new PagingVO();
		
		pb.setStartCount(getStartCount(page));
		pb.setEndCount(getEndCount(page));
		pb.setMaxPcount(getMaxPcount(maxCount));
		pb.setStartPcount(getStartPcount(page));
		pb.setEndPcount(getEndPcount(page, maxCount));
		
		return pb;
	}
	
	/*
	 * Custom Mode Paging
	 */
	//테이블 시작row
	@Override
	public int getStartCount(int page, int viewCount) {
		int startCount = 0;
		startCount = (page - 1) * viewCount + 1;
		return startCount;
	}
	
	//테이블 종료row
	@Override
	public int getEndCount(int page, int viewCount) {
		int endCount = 0;
		endCount = page * viewCount;
		return endCount;
	}
	
	//페이징 최대 크기
	@Override
	public int getMaxPcount(int maxCount, int viewCount) {
		int maxPcount = 0;
		
		if(maxCount % viewCount > 0){
			maxPcount = (maxCount / viewCount) + 1;
		} else {
			maxPcount = (maxCount / viewCount);
		}
		
		if(maxCount == 0) {
			maxPcount = 1;
		}
		
		return maxPcount;
	}
	
	//현재페이지 기준 시작페이지
	@Override
	public int getStartPcount(int page, int pageCount) {
		int startPcount = 0;
		
		if(page % pageCount == 0 ) {
			startPcount = page - pageCount + 1;
		} else {
			startPcount = ((page / pageCount) * pageCount) + 1;
		}
		
		return startPcount;
	}
	
	//현재페이지 기준 종료페이지
	@Override
	public int getEndPcount(int page, int maxCount, int viewCount, int pageCount) {
		int endPcount = 0;
		int maxPcount = getMaxPcount(maxCount, viewCount);
		
		endPcount = getStartPcount(page, pageCount) + pageCount - 1;
		
		if(endPcount >= maxPcount){
			endPcount = maxPcount;
		}
		
		return endPcount;
	}
	
	//빈형식으로 취득
	@Override
	public PagingVO getPageingBean(int page, int maxCount,
									 int viewCount, int pageCount) {
		PagingVO pb = new PagingVO();
		
		pb.setStartCount(getStartCount(page, viewCount));
		pb.setEndCount(getEndCount(page, viewCount));
		pb.setMaxPcount(getMaxPcount(maxCount, viewCount));
		pb.setStartPcount(getStartPcount(page, pageCount));
		pb.setEndPcount(getEndPcount(page, maxCount, viewCount, pageCount));
		
		return pb;
	}
}
package kr.lcm.model.common;

public class ClanVO {
	/* 클랜 명 */
    private String nm;
    
    /* 클랜 관리자 */
    private String master;
    
    /* 클랜 로고 */
    private String img;
    
    /* 클랜 삭제 여부 */
    private String del_yn;

	public String getNm() {
		return nm;
	}

	public void setNm(String nm) {
		this.nm = nm;
	}

	public String getMaster() {
		return master;
	}

	public void setMaster(String master) {
		this.master = master;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getDel_yn() {
		return del_yn;
	}

	public void setDel_yn(String del_yn) {
		this.del_yn = del_yn;
	}

	@Override
	public String toString() {
		return "ClanVO [nm=" + nm + ", master=" + master + ", img=" + img + ", del_yn=" + del_yn + "]";
	}
    
}

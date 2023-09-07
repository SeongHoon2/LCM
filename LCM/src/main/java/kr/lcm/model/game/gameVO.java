package kr.lcm.model.game;

public class gameVO {
    
    /* 내전 참가자 이메일 */
    private String email_txt;
    
    /* 내전 참가자 반영 전 elo */
    private int pre_elo;
    
    /* 내전 참가자 반영 후 elo */
    private int aft_elo;
    
    /* 내전 참가자 반영 전후 elo 차이 */
    private int pm_elo;

	public void setEmail_txt(String email_txt) {
		this.email_txt = email_txt;
	}

	public void setPre_elo(int pre_elo) {
		this.pre_elo = pre_elo;
	}

	public void setAft_elo(int aft_elo) {
		this.aft_elo = aft_elo;
	}

	public void setPm_elo(int pm_elo) {
		this.pm_elo = pm_elo;
	}

}

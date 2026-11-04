// Web Audio SFX disabled per user request
class SoundManager {
  public enabled: boolean = false;
  public toggle(): boolean {
    return false;
  }
  public playClick() {}
  public playHover() {}
  public playSuccess() {}
}

export const sounds = new SoundManager();

class SaveWizzard {
  private saveHistory: Array<any> = [];
  private index: number = 0;
  private limit: number = 10;
  constructor(defaultVersion, limit?) {
    // 这里初始化保存的历史,必须需要至少一个节点
    if (defaultVersion) {
      this.saveHistory = [defaultVersion];
    }
    if (limit) {
      this.limit = limit;
    }
  }
  push = (stack) => {
    const length = this.saveHistory.length;
    if (length >= this.limit) {
      const newArr = this.saveHistory.slice(0, this.index + 1).concat([stack]);
      if (newArr.length > this.limit) {
        newArr.shift();
        this.saveHistory = newArr;
        if (this.index < length - 1) {
          this.index += 1;
        }
        return this.getResult(true, this.index);
      } else {
        this.saveHistory = newArr;
        this.index += 1;
        return this.getResult(true, this.index);
      }
    } else {
      this.saveHistory = this.saveHistory
        .slice(0, this.index + 1)
        .concat([stack]);
      this.index += 1;
      return this.getResult(true, this.index);
    }
  };

  move = (offset: number) => {
    const length = this.saveHistory.length;
    const resultIndex = this.index + offset;
    if (resultIndex < 0 || resultIndex >= length) {
      return this.getResult(false, this.index);
    } else {
      this.index += offset;
      return this.getResult(true, this.index);
    }
  };
  clear = (stack) => {
    this.saveHistory = [stack];
    this.index = 0;
  };
  private getResult = (success: boolean, index: number) => {
    // 这里通过return栈的长度/index值+1,来确定当前的指针是否指向数组的最后一个值,
    return {
      success,
      isLast: this.saveHistory.length / (index + 1) === 1,
      isFirst: index === 0,
      data: this.saveHistory[index]
    };
  };
}
export default SaveWizzard;

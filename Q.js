function Q(onStateChange, onTaskComplete, onTaskProgress) {
  var tasks = [],
    ids = [],
    index = 0,
    processID, fn;

  function handleComplete(msg) {
    onTaskComplete(ids[index], msg);
    index++;
    if (!tasks[index]) {
      pause();
      onStateChange('end');
    } else {
      fn = tasks[index]();
    }
  }

  function handleProgress(msg) {
    onTaskProgress(ids[index], msg);
  }

  function runner() {
    fn(handleComplete, handleProgress);
  }

  function pause() {
    if (processID) {
      clearInterval(processID);
      processID = 0;
      onStateChange('pause');
    }
  }

  return {
    'run': function() {
      if (!processID) {
        processID = setInterval(runner, 1); //1 ms required for old IE
        onStateChange('run');
      }
    },
    'pause': pause,
    'reset': function() {
      pause();
      index = 0;
      fn = tasks[index]();
      onStateChange('reset');
    },
    'task': function(id, onSetup) {
      tasks.push(onSetup);
      ids.push(id);
      this['reset']();
    }
  }
}

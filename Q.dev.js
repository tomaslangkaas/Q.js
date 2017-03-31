/*
  https://github.com/tomaslangkaas/Q.js
  MIT licensed
  2016 (c) Tomas Langkaas
*/

function Q(onStateChange, onTaskComplete, onTaskProgress) {
  var tasks = [],
    ids = [],
    index = 0,
    running = 0,
    fn;

  function handleComplete(msg) {
    onTaskComplete(ids[index], msg);
    index++;
    if (!tasks[index]) {
      pause();
      onStateChange('end');
    } else {
      fn = tasks[index]();
      setTimeout(runner);
    }
  }

  function handleProgress(msg) {
    onTaskProgress(ids[index], msg);
    setTimeout(runner);
  }

  function runner() {
    if(running){
      fn(handleComplete, handleProgress);
    }
  }

  function pause() {
    if (running) {
      running = 0;
      onStateChange('pause');
    }
  }

  return {
    'run': function() {
      if (!running) {
        running = 1;
        runner();
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

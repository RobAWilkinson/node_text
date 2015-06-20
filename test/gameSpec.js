var expect = require('chai').expect;
var path = require('path');
var child = require('child_process');
function helperConverter(input) {
  return input.toString('utf-8');
}

describe('asks questions to the user', function() {
  beforeEach(function() {
    exec = path.join(__dirname, '..', 'game.js');
    proc = child.spawn(exec, {stdio: 'pipe'});
  });
  it('tests', function(done) {
    proc.stdout.once('data', function(output) {
      expect(output.toString('utf-8')).to.eq("Would you like to play?\n");
      done();
    });
  });
  xit('lets a user cancel a game by typing "no" at prompt', function(done) {
    proc.stdout.once('data', function(dataOutput){
      proc.stdin.write("no\r");
      proc.stdout.on('data', function(output) {
        expect(output.toString('utf-8')).to.eq("Wiggity whack");
        done();
      });
    });
  });
  xit('lets a user start a game by typing "yes" at prompt', function(done) {
    proc.stdout.once('data', function(dataOutput){
      proc.stdin.write("yes\r");
      proc.stdout.once('data', function(output) {
        expect(helperConverter(output)).to.eq('Awesome!\n');
        done();
      });
    });
  });
  xit('asks a user to pick a favorite programming language by pressing "1" at prompt', function(done) {
    proc.stdout.once('data', function(data){
      proc.stdin.write("yes\r");
      proc.stdout.once("data", function(){
        proc.stdout.on('data', function(data){
          expect(helperConverter(data)).to.eq('What is your favorite programming language?\n1: Javascript\n2: Cobol\n3: Erlang\n');
          done();
        });
      });
    });
  });
  xit('the user can pick javascript! by pressing "1" at the prompt', function(done) {
    proc.stdout.once('data', function(){
      proc.stdin.write("yes\r");
      proc.stdout.once("data", function(){
        proc.stdout.once('data', function(){
          proc.stdin.write('1\r');
          proc.stdout.on('data', function(data) {
            expect(helperConverter(data)).to.eq('Really?\nProve it!\nWrite some javascript that evaluates to 42\n');
            done();
          })
        });
      });
    });
  });
  xit('the user can enter js that evals to 42 as a sum', function(done) {
    proc.stdout.once('data', function(data){
      proc.stdin.write("yes\r");
      proc.stdout.once("data", function(){
        proc.stdout.once('data', function(data){
          proc.stdin.write('1\r');
          proc.stdout.once('data', function(data) {
            proc.stdin.write('40 + 2\r');
              proc.stdout.on('data', function(data) {
                expect(helperConverter(data)).to.eq('Nice Job\nHow about another?\n Given an array arr = [1,2,3] how do you get the first element?\n');
                done();
              });
          })
        });
      });
    });
  });
  xit('the user can enter js that evals to 42 as multiply', function(done) {
    proc.stdout.once('data', function(data){
      proc.stdin.write("yes\r");
      proc.stdout.once("data", function(){
        proc.stdout.once('data', function(data){
          proc.stdin.write('1\r');
          proc.stdout.once('data', function(data) {
            proc.stdin.write('21 * 2\r');
              proc.stdout.on('data', function(data) {
                expect(helperConverter(data)).to.eq('Nice Job\nHow about another?\n Given an array arr = [1,2,3] how do you get the first element?\n');
                done();
              });
          })
        });
      });
    });
  });
});

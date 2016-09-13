goog.provide( 'zz.mvc.Step1' );
goog.setTestOnly( 'zz.mvc.Step1' );
goog.require( 'goog.testing.jsunit' );

var test = 1;
function testDemo1( ){

    assertNotUndefined( 'it should be defined', test );
}
function testDemo2( ){

    assertNotNull( 'and not null', test );
}
function testDemo3( ){

    assertEquals( 'and equals 1', 1, 1 );
}
function testDemo4( ){

    assertEquals( 'and here we fail', 1, 0 );
}
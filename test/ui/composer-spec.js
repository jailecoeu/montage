/* <copyright>
 This file contains proprietary software owned by Motorola Mobility, Inc.<br/>
 No rights, expressed or implied, whatsoever to this software are provided by Motorola Mobility, Inc. hereunder.<br/>
 (c) Copyright 2011 Motorola Mobility, Inc.  All Rights Reserved.
 </copyright> */
var Montage = require("montage").Montage,
    TestPageLoader = require("support/testpageloader").TestPageLoader;

var serializationTestPage = TestPageLoader.queueTest("composer-serialization", {src: "ui/composer/composer-serialization-test-page.html", firstDraw: false}, function() {
    describe("ui/composer-spec", function() {
        it("should load", function() {
            expect(serializationTestPage.loaded).toBeTruthy();
        });

        describe("serialized composer", function() {
            it("should have its load method called", function() {
                expect(serializationTestPage.test.simpleTestComposer._loadWasCalled).toBeTruthy();
            });
            it("should have its frame method called after setting needsFrame", function() {
                serializationTestPage.test.simpleTestComposer.needsFrame = true;
                spyOn(serializationTestPage.test.simpleTestComposer, "frame").andCallThrough();

                serializationTestPage.waitForDraw();

                runs(function(){
                    expect(serializationTestPage.test.simpleTestComposer.frame).toHaveBeenCalled();
                });

            });
//            it("should have its unload method called", function() {
//
//            });
        });
    });
});

var simpleTestPage = TestPageLoader.queueTest("composer-programmatic", {src: "ui/composer/composer-test-page.html", firstDraw: false}, function() {
    describe("ui/composer-spec", function() {
        it("should load", function() {
            expect(simpleTestPage.loaded).toBeTruthy();
        });

        describe("programmatically added composer", function() {
            it("should have its load method called", function() {
                expect(simpleTestPage.test.simpleTestComposer._loadWasCalled).toBeTruthy();
            });
            it("should have its frame method called after setting needsFrame", function() {
                simpleTestPage.test.simpleTestComposer.needsFrame = true;
                spyOn(simpleTestPage.test.simpleTestComposer, "frame").andCallThrough();

                simpleTestPage.waitForDraw();

                runs(function(){
                    expect(simpleTestPage.test.simpleTestComposer.frame).toHaveBeenCalled();
                });

            });
//            it("should have its unload method called", function() {
//
//            });
        });
    });
});

var swipeTestPage = TestPageLoader.queueTest("swipe-composer", {src:"ui/composer/swipe/swipe.html", firstDraw: false}, function() {
    describe("ui/composer-spec", function() {
        it("should load", function() {
            expect(swipeTestPage.loaded).toBeTruthy();
        });

        describe("swipe right",function() {
            it("shouldn't emit swipe event or swipemove event if no move", function() {
                //simulate touch events
                spyOn(swipeTestPage.test, 'handleSwipe').andCallThrough();
                spyOn(swipeTestPage.test, 'handleSwipemove').andCallThrough();
                swipeTestPage.touchEvent(EventInfo.create().initWithElementAndPosition(null, -100, 100), "touchstart", function() {
                    swipeTestPage.touchEvent(EventInfo.create().initWithElementAndPosition(null, -100, 100), "touchmove", function() {
                        swipeTestPage.touchEvent(EventInfo.create().initWithElementAndPosition(null, -100, 100), "touchend", function() {
                            expect(swipeTestPage.test.handleSwipemove).not.toHaveBeenCalled();
                            expect(swipeTestPage.test.handleSwipe).not.toHaveBeenCalled();
                        });
                    });

                });
            });

            it("should emit swipe event and swipemove event", function() {
                //simulate touch events
                spyOn(swipeTestPage.test, 'handleSwipe').andCallThrough();
                spyOn(swipeTestPage.test, 'handleSwipemove').andCallThrough();
                swipeTestPage.touchEvent(EventInfo.create().initWithElementAndPosition(null, 0, 0), "touchstart", function() {
                    swipeTestPage.touchEvent(EventInfo.create().initWithElementAndPosition(null, 0, 50), "touchmove", function() {
                        swipeTestPage.touchEvent(EventInfo.create().initWithElementAndPosition(null, 0, 100), "touchmove", function() {
                            swipeTestPage.touchEvent(EventInfo.create().initWithElementAndPosition(null, 50, 50), "touchend", function() {
                                expect(swipeTestPage.test.handleSwipemove).toHaveBeenCalled();
                                expect(swipeTestPage.test.handleSwipe).toHaveBeenCalled();
                            });
                        });
                    });
                 });
            });

        }
        );
    });
});



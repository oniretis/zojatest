import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import moment from "moment-timezone";

import Tooltip from "../src/tooltip";

describe("Tooltip Time Display", () => {
  test("one day event", () => {
    let startTime = moment.utc("2020-04-20T04:30:00+00:00");
    let endTime = moment.utc("2020-04-20T15:30:00+00:00");

    let output = Tooltip.getTimeDisplay(startTime, endTime, false);
    let expected = "Monday, April 20th\n4:30am - 3:30pm";
    
    expect(output).toEqual(expected);
  });

  
  test("one day all day event",() => {
    let startTime = moment.utc("2020-04-20").startOf("day");
    let endTime = moment.utc("2020-04-21").startOf("day");

    let output = Tooltip.getTimeDisplay(startTime, endTime, true);
    let expected = "Monday, April 20th";

    expect(output).toEqual(expected);
  });

  test("multiple day all day event",() => {
    let startTime = moment.utc("2020-03-20").startOf("day");
    let endTime = moment.utc("2020-03-25").startOf("day");
    
    let output = Tooltip.getTimeDisplay(startTime, endTime, true);
    let expected = "Mar 20th, 2020 - Mar 24th, 2020";

    expect(output).toEqual(expected);
  });

  test("multiple day event",() => {
    let startTime = moment.utc("2020-03-20T04:30:00+00:00");
    let endTime = moment.utc("2020-03-25T15:30:00+00:00");
    
    let output = Tooltip.getTimeDisplay(startTime, endTime, false);
    let expected = "Mar 20th, 2020, 4:30am -\nMar 25th, 2020, 3:30pm";

    expect(output).toEqual(expected);
  });
});

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Tooltip Rendering", () => {
  test("correct event name",() => {
    let props = {
      name: "Test Event",
      startTime: moment(),
      endTime: moment(),
    };
    act(() => {
      ReactDOM.render(<Tooltip showTooltip={false} {...props} />, container);
    });

    expect(container.querySelector(".tooltip-text").textContent).toEqual(expect.stringContaining("Test Event"));
  });

  test("correctly has no description",() => {
    let props = {
      name: "Test Event",
      startTime: moment(),
      endTime: moment(),
    };
    act(() => {
      ReactDOM.render(<Tooltip showTooltip={false} {...props} />, container);
    });

    expect(container.querySelector(".description")).toBeNull();
  });

  test("correct description",() => {
    let props = {
      name: "Test Event",
      startTime: moment(),
      endTime: moment(),
      description: "some description",
    };
    act(() => {
      ReactDOM.render(<Tooltip showTooltip={false} {...props} />, container);
    });

    expect(container.querySelector(".description").textContent).toEqual("some description");
  });

  test("correctly has no location",() => {
    let props = {
      name: "Test Event",
      startTime: moment(),
      endTime: moment(),
    };
    act(() => {
      ReactDOM.render(<Tooltip showTooltip={false} {...props} />, container);
    });

    expect(container.querySelector(".location")).toBeNull();
  });

  test("correct location",() => {
    let props = {
      name: "Test Event",
      startTime: moment(),
      endTime: moment(),
      location: "A location",
    };
    act(() => {
      ReactDOM.render(<Tooltip showTooltip={false} {...props} />, container);
    });

    expect(container.querySelector(".location").textContent).toEqual("A location");
  });

  test("correctly has no calendarName",() => {
    let props = {
      name: "Test Event",
      startTime: moment(),
      endTime: moment(),
    };
    act(() => {
      ReactDOM.render(<Tooltip showTooltip={false} {...props} />, container);
    });

    expect(container.querySelector(".calendarName")).toBeNull();
  });

  test("correct calendarName",() => {
    let props = {
      name: "Test Event",
      startTime: moment(),
      endTime: moment(),
      calendarName: "Calendar",
    };
    act(() => {
      ReactDOM.render(<Tooltip showTooltip={false} {...props} />, container);
    });

    expect(container.querySelector(".calendarName").textContent).toEqual("Calendar");
  });

});

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import HelloWorld from "./hello-world";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders with a name", () => {
    act(() => {
        render(<HelloWorld name="John Doe" />, container);
    });
    expect(container.textContent).toBe("Hello John Doe!");
});

it("renders without a name", () => {
    act(() => {
        render(<HelloWorld />, container);
    });
    expect(container.textContent).toBe("Hello World!");
});
import { expect, test } from "vitest"
import { render } from "vitest-browser-react"
import NotFound from "@/screens/NotFound"
import { BrowserRouter } from "react-router-dom"

test("renders notfound", () => {
  const { getByText } = render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  )
  expect(getByText("Oops!").element()).toBeInTheDocument()
  expect(
    getByText(
      "The page you're looking for doesn't exist or has been moved."
    ).element()
  ).toBeInTheDocument()
})

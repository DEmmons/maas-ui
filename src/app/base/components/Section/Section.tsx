import type { HTMLProps, ReactNode } from "react";

import { Col, Row, Strip } from "@canonical/react-components";
import type { ColSize } from "@canonical/react-components";

import NotificationList from "app/base/components/NotificationList";
import { COL_SIZES } from "app/base/constants";

export type Props = {
  children?: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
} & HTMLProps<HTMLDivElement>;

const Section = ({
  children,
  header,
  sidebar,
  ...props
}: Props): JSX.Element => {
  const { SIDEBAR, TOTAL } = COL_SIZES;
  return (
    <div className="section" {...props}>
      {header ? (
        <div className="section__header-wrapper">
          <Row>
            <Col size={12}>{header}</Col>
          </Row>
        </div>
      ) : null}
      <Strip
        element="section"
        includeCol={false}
        rowClassName="section__content-wrapper"
        shallow
      >
        {sidebar && (
          <Col className="section__sidebar" element="aside" size={SIDEBAR}>
            {sidebar}
          </Col>
        )}
        <Col
          className="section__content"
          size={(sidebar ? TOTAL - SIDEBAR : TOTAL) as ColSize}
        >
          <NotificationList />
          {children}
        </Col>
      </Strip>
    </div>
  );
};

export default Section;
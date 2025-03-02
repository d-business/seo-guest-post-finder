import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Spinner, InputGroup } from 'react-bootstrap';

const NicheInput = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    niche: '',
    minDA: 0,
    maxDA: 80,
    keywords: '',
    competitorDomains: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format data for API
    const submitData = {
      niche: formData.niche,
      min_da: parseInt(formData.minDA),
      max_da: parseInt(formData.maxDA),
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
      competitor_domains: formData.competitorDomains.split(',').map(d => d.trim()).filter(d => d)
    };
    
    onSubmit(submitData);
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Find Guest Post Opportunities</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Niche/Industry</Form.Label>
                <Form.Control
                  type="text"
                  name="niche"
                  value={formData.niche}
                  onChange={handleChange}
                  placeholder="e.g., fitness, digital marketing, sustainable fashion"
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Domain Authority Range</Form.Label>
                <Row>
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>Min</InputGroup.Text>
                      <Form.Control
                        type="number"
                        name="minDA"
                        value={formData.minDA}
                        onChange={handleChange}
                        min="0"
                        max="80"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>Max</InputGroup.Text>
                      <Form.Control
                        type="number"
                        name="maxDA"
                        value={formData.maxDA}
                        onChange={handleChange}
                        min="0"
                        max="80"
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Keywords (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="e.g., fitness blog, health tips, workout routines"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Competitor Domains (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="competitorDomains"
                  value={formData.competitorDomains}
                  onChange={handleChange}
                  placeholder="e.g., competitor1.com, competitor2.com"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                Finding Opportunities...
              </>
            ) : (
              'Find Opportunities'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NicheInput;
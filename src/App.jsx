import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Users, AlertCircle, BookOpen, Clock, Heart, DollarSign } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [predictionInput, setPredictionInput] = useState({
    studyTime: 5,
    sleepHours: 7,
    grade10: 85,
    grade12: 80,
    collegeMarks: 75,
    socialMedia: 3,
    travelTime: 30,
    partTimeJob: 'no',
    financialStatus: 'medium'
  });
  const [prediction, setPrediction] = useState(null);

  // Sample data for visualizations
  const stressDistribution = [
    { level: 'Low', count: 120, percentage: 35 },
    { level: 'Medium', count: 180, percentage: 52 },
    { level: 'High', count: 45, percentage: 13 }
  ];

  const studyTimeVsStress = [
    { hours: '0-2', stress: 7.5 },
    { hours: '2-4', stress: 5.2 },
    { hours: '4-6', stress: 4.8 },
    { hours: '6-8', stress: 6.5 },
    { hours: '8+', stress: 8.2 }
  ];

  const factorsImpact = [
    { factor: 'Academic Pressure', impact: 85 },
    { factor: 'Financial Status', impact: 72 },
    { factor: 'Sleep Quality', impact: 68 },
    { factor: 'Social Media Usage', impact: 55 },
    { factor: 'Travel Time', impact: 45 },
    { factor: 'Part-time Job', impact: 38 }
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const calculatePrediction = () => {
    // Simple prediction logic (you'll replace with actual ML model)
    let stressScore = 0;
    
    // Study time impact
    if (predictionInput.studyTime < 2 || predictionInput.studyTime > 8) stressScore += 25;
    else if (predictionInput.studyTime >= 4 && predictionInput.studyTime <= 6) stressScore += 10;
    else stressScore += 15;
    
    // Sleep impact
    if (predictionInput.sleepHours < 6) stressScore += 30;
    else if (predictionInput.sleepHours > 8) stressScore += 15;
    else stressScore += 5;
    
    // Academic performance
    const avgMarks = (predictionInput.grade10 + predictionInput.grade12 + predictionInput.collegeMarks) / 3;
    if (avgMarks < 60) stressScore += 35;
    else if (avgMarks < 75) stressScore += 20;
    else stressScore += 10;
    
    // Social media
    if (predictionInput.socialMedia > 5) stressScore += 20;
    else stressScore += 5;
    
    // Travel time
    if (predictionInput.travelTime > 60) stressScore += 15;
    
    // Financial status
    if (predictionInput.financialStatus === 'low') stressScore += 25;
    else if (predictionInput.financialStatus === 'medium') stressScore += 10;
    
    // Part-time job
    if (predictionInput.partTimeJob === 'yes') stressScore += 15;
    
    let level, color, recommendations;
    if (stressScore < 40) {
      level = 'Low Stress';
      color = 'text-green-600';
      recommendations = ['Maintain current lifestyle', 'Keep up good sleep habits', 'Continue balanced study routine'];
    } else if (stressScore < 70) {
      level = 'Moderate Stress';
      color = 'text-yellow-600';
      recommendations = ['Practice stress management techniques', 'Ensure adequate sleep (7-8 hours)', 'Take regular breaks', 'Consider talking to a counselor'];
    } else {
      level = 'High Stress';
      color = 'text-red-600';
      recommendations = ['Seek counseling support immediately', 'Prioritize mental health', 'Reduce workload if possible', 'Practice meditation/mindfulness', 'Talk to academic advisor'];
    }
    
    setPrediction({ score: stressScore, level, color, recommendations });
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">Student Stress Analysis</span>
            </div>
            <div className="flex space-x-4 items-center">
              {['home', 'dashboard', 'predict', 'about'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-indigo-50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white">
              <h1 className="text-5xl font-bold mb-4">Understanding Student Stress Through Data</h1>
              <p className="text-xl mb-6 text-indigo-100">
                A comprehensive machine learning approach to analyze and predict student stress levels
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('predict')}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                >
                  Try Prediction Tool
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors"
                >
                  View Analytics
                </button>
              </div>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard icon={Users} title="Students Analyzed" value="345" color="bg-blue-500" />
              <StatCard icon={Brain} title="Prediction Accuracy" value="87%" color="bg-green-500" />
              <StatCard icon={AlertCircle} title="High Stress Cases" value="13%" color="bg-red-500" />
              <StatCard icon={TrendingUp} title="Improvement Rate" value="68%" color="bg-purple-500" />
            </div>

            {/* Problem Statement */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">The Problem</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Students today face unprecedented levels of stress from multiple sources including academic pressure, 
                financial constraints, social media, and personal challenges. This stress significantly impacts their 
                mental health, academic performance, and overall well-being. Our research aims to understand these 
                stress factors through data analysis and develop predictive models to identify at-risk students early.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <BookOpen className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Data Analysis</h3>
                <p className="text-gray-600">
                  Comprehensive exploratory data analysis to identify patterns and correlations in student behavior and stress levels.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Brain className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">ML Prediction</h3>
                <p className="text-gray-600">
                  Machine learning models trained to predict stress levels based on various lifestyle and academic factors.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Heart className="w-12 h-12 text-pink-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Intervention Support</h3>
                <p className="text-gray-600">
                  Personalized recommendations and support systems to help students manage stress effectively.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">Analytics Dashboard</h1>
            
            {/* Stress Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Stress Level Distribution</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stressDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ level, percentage }) => `${level}: ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stressDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-4">
                  {stressDistribution.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: COLORS[idx] }}></div>
                        <span className="font-semibold text-gray-700">{item.level} Stress</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-800">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Study Time vs Stress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Study Time vs Stress Level</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={studyTimeVsStress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hours" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="stress" stroke="#8b5cf6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Key Factors Impact */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Stress Factors Impact Analysis</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={factorsImpact} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="factor" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="impact" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'predict' && (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">Stress Level Prediction Tool</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Study Time (hours): {predictionInput.studyTime}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      value={predictionInput.studyTime}
                      onChange={(e) => setPredictionInput({...predictionInput, studyTime: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sleep Hours: {predictionInput.sleepHours}
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="12"
                      value={predictionInput.sleepHours}
                      onChange={(e) => setPredictionInput({...predictionInput, sleepHours: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      10th Grade Marks (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={predictionInput.grade10}
                      onChange={(e) => setPredictionInput({...predictionInput, grade10: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      12th Grade Marks (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={predictionInput.grade12}
                      onChange={(e) => setPredictionInput({...predictionInput, grade12: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current College Marks (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={predictionInput.collegeMarks}
                      onChange={(e) => setPredictionInput({...predictionInput, collegeMarks: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Media Usage (hours/day): {predictionInput.socialMedia}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={predictionInput.socialMedia}
                      onChange={(e) => setPredictionInput({...predictionInput, socialMedia: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Travel Time (minutes)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      value={predictionInput.travelTime}
                      onChange={(e) => setPredictionInput({...predictionInput, travelTime: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Part-time Job
                    </label>
                    <select
                      value={predictionInput.partTimeJob}
                      onChange={(e) => setPredictionInput({...predictionInput, partTimeJob: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Financial Status
                    </label>
                    <select
                      value={predictionInput.financialStatus}
                      onChange={(e) => setPredictionInput({...predictionInput, financialStatus: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <button
                    onClick={calculatePrediction}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Predict Stress Level
                  </button>
                </div>
              </div>

              {/* Prediction Results */}
              <div className="space-y-6">
                {prediction ? (
                  <>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Prediction Results</h2>
                      <div className="space-y-4">
                        <div className="p-6 bg-gray-50 rounded-lg text-center">
                          <p className="text-gray-600 mb-2">Stress Score</p>
                          <p className="text-5xl font-bold text-indigo-600">{prediction.score}/100</p>
                        </div>
                        <div className={`p-4 rounded-lg text-center ${
                          prediction.level === 'Low Stress' ? 'bg-green-100' :
                          prediction.level === 'Moderate Stress' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          <p className={`text-2xl font-bold ${prediction.color}`}>{prediction.level}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Recommendations</h3>
                      <ul className="space-y-2">
                        {prediction.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-indigo-600 mt-1">•</span>
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Fill in the student information and click "Predict Stress Level" to see results
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">About the Project</h1>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                This B.Tech final year project focuses on analyzing and predicting student stress levels using 
                machine learning techniques. The system analyzes various factors including academic performance, 
                study habits, sleep patterns, social media usage, and financial status to provide insights into 
                student well-being.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Methodology</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h3 className="font-bold text-lg text-gray-800">Data Collection</h3>
                  <p className="text-gray-600">
                    Dataset collected from 345 university students covering academic records, lifestyle habits, 
                    and self-reported stress levels.
                  </p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="font-bold text-lg text-gray-800">Data Preprocessing</h3>
                  <p className="text-gray-600">
                    Data cleaning, handling missing values, feature scaling, and encoding categorical variables 
                    for model training.
                  </p>
                </div>
                <div className="border-l-4 border-pink-600 pl-4">
                  <h3 className="font-bold text-lg text-gray-800">Model Training</h3>
                  <p className="text-gray-600">
                    Multiple ML algorithms tested including Logistic Regression, Random Forest, and SVM. 
                    Best performing model achieved 87% accuracy.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg text-gray-800">Deployment</h3>
                  <p className="text-gray-600">
                    Web-based interface for real-time predictions and data visualization to make insights 
                    accessible to educators and counselors.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Findings</h2>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-indigo-600 text-xl">✓</span>
                  <span className="text-gray-600">Academic pressure is the primary stress factor affecting 85% of students</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-indigo-600 text-xl">✓</span>
                  <span className="text-gray-600">Students with less than 6 hours of sleep show 3x higher stress levels</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-indigo-600 text-xl">✓</span>
                  <span className="text-gray-600">Optimal study time is 4-6 hours daily; both extremes correlate with higher stress</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-indigo-600 text-xl">✓</span>
                  <span className="text-gray-600">Financial constraints significantly impact 72% of stressed students</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Technologies Used</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Python', 'Pandas', 'Scikit-learn', 'NumPy', 'Matplotlib', 'Seaborn', 'React', 'Machine Learning'].map((tech) => (
                  <div key={tech} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-center font-semibold">
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Future Scope</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Integration with wearable devices for real-time physiological data</li>
                <li>• Mobile application for continuous stress monitoring</li>
                <li>• AI-powered personalized intervention recommendations</li>
                <li>• Integration with university counseling services</li>
                <li>• Expansion to multiple universities for broader dataset</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
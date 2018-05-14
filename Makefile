all: .virtualenv
	. .virtualenv/bin/activate && \
	pip3 install -r requirements.txt && \
	python3 manage.py migrate && \
	python3 manage.py runserver

clean:
	find provost/ -name '*.pyc' -exec rm -f {} \;

.virtualenv:
	which virtualenv || pip3 install virtualenv
	virtualenv --python=python3 .virtualenv

requirements.txt: .virtualenv
	. .virtualenv/bin/activate && \
	pip3 freeze > requirements.txt
	
apk: clean
	docker build -t sofwerx/djangoforandroid .
	docker run -ti --rm -v $(PWD)/outputs/:/outputs sofwerx/djangoforandroid


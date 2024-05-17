schema\:save:
	python src/save_openapi.py
pip\:apply:
	pip install -r requirements.txt &&
	pip install -r requirements.dev.txt
start\:local:
	uvicorn src.main:app --reload
db\:apply:
	alembic upgrade head
db\:migration:
	cd src/migrations &&
	alembic revision --autogenerate -m $1
format\:sort:
	isort -rc src
dep\:graph:
	pydeps -T png src
dep\:graph\:circle:
	pydeps -T png --show-cycles src
